import getCurrentUser from "./get-current-user";
import recommendDepartment from "./recommend-department";
import listDoctors from "./list-doctors";
import checkAvailability from "./check-availability";
import bookAppointment from "./book-appointment";
import rescheduleAppointment from "./reschedule-appointment";
import cancelAppointment from "./cancel-appointment";
import getUserAppointments from "./get-user-appointments";
import getPreparationGuide from "./get-preparation-guide";
import searchHospitalFaq from "./search-hospital-faq";
import scheduleFollowup from "./schedule-followup";
import findNearestBranch from "./find-nearest-branch";
import saveFeedbackNote from "./save-feedback-note";

export const tools = {
  get_current_user: getCurrentUser,
  recommend_department: recommendDepartment,
  list_doctors: listDoctors,
  check_availability: checkAvailability,
  book_appointment: bookAppointment,
  reschedule_appointment: rescheduleAppointment,
  cancel_appointment: cancelAppointment,
  get_user_appointments: getUserAppointments,
  get_preparation_guide: getPreparationGuide,
  search_hospital_faq: searchHospitalFaq,
  schedule_followup: scheduleFollowup,
  find_nearest_branch: findNearestBranch,
  save_feedback_note: saveFeedbackNote,
};

export type ToolName = keyof typeof tools;
