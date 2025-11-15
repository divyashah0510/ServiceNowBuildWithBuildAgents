import { gs, GlideRecord } from '@servicenow/glide'

export function assignTechnicalIncident(current, previous) {
  // Only process incidents created through our technical incident producer
  if (current.getValue('category') !== 'inquiry' || !current.getValue('subcategory')) {
    return;
  }

  try {
    // Set assignment group based on subcategory
    const subcategory = current.getValue('subcategory');
    let assignmentGroup = '';

    switch (subcategory) {
      case 'hardware':
        assignmentGroup = 'Hardware'; 
        break;
      case 'software':
        assignmentGroup = 'Software';
        break;
      case 'network':
        assignmentGroup = 'Network';
        break;
      case 'email':
        assignmentGroup = 'Email Administration';
        break;
      case 'access':
        assignmentGroup = 'Service Desk';
        break;
      case 'printing':
        assignmentGroup = 'Hardware';
        break;
      default:
        assignmentGroup = 'Service Desk';
    }

    // Try to find the assignment group by name
    const groupGR = new GlideRecord('sys_user_group');
    groupGR.addQuery('name', 'CONTAINS', assignmentGroup);
    groupGR.query();

    if (groupGR.next()) {
      current.setValue('assignment_group', groupGR.getUniqueValue());
    } else {
      // Fallback to Service Desk if specific group not found
      const fallbackGR = new GlideRecord('sys_user_group');
      fallbackGR.addQuery('name', 'Service Desk');
      fallbackGR.query();
      if (fallbackGR.next()) {
        current.setValue('assignment_group', fallbackGR.getUniqueValue());
      }
    }

    // Set caller_id and opened_by to current user if they were passed as javascript expressions
    if (current.getValue('caller_id') === 'javascript:gs.getUserID()') {
      current.setValue('caller_id', gs.getUserID());
    }
    if (current.getValue('opened_by') === 'javascript:gs.getUserID()') {
      current.setValue('opened_by', gs.getUserID());
    }

    // Add a work note about the automatic assignment
    const workNote = `Incident automatically assigned to ${assignmentGroup} based on category: ${subcategory}`;
    current.setValue('work_notes', workNote);

    gs.addInfoMessage(`Your technical issue has been assigned to the ${assignmentGroup} team for resolution.`);

  } catch (error) {
    gs.error('Error in technical incident assignment: ' + error.message);
  }
}