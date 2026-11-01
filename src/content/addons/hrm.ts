import type { AddonContent } from "./types";

// Source: domains/hrm (handler.py seeds a General department and Casual/Sick/
// Annual/Unpaid leave types; models employee/shift/holiday/attendance/leave/
// payroll; services attendance_service.py mark + bulk_mark + month sheet,
// leave_service.py, payroll_service.py attendance-based monthly payslips,
// overtime, finalize posts a salary expense, hourly_pay.py, rider_payroll.py,
// qr_clock_in_service.py behind the restaurant qr_clock_in_enabled setting;
// employee_import_service.py). Rotas + UK payroll export are left out: they are
// behind HRM_ROTAS_ENABLED / HRM_UK_PAYROLL_EXPORT_ENABLED, off by default.
const content: AddonContent = {
  slug: "hrm",
  seoTitle: "HR & Payroll Add-on: Staff, Attendance, Leave and Salaries",
  seoDescription:
    "Keep staff records, mark attendance, approve leave and run monthly payroll with payslips. Absences and overtime are worked out, and salaries post to expenses.",
  keywords: [
    "payroll software for shops",
    "staff attendance system",
    "leave management for small business",
    "salary software Pakistan",
    "restaurant staff payroll",
    "HR software for retail",
  ],
  schemaSubCategory: "HR and payroll add-on for POS",
  headline: "Staff records, attendance, leave and monthly pay in the same place as your sales.",
  overview: [
    "HR & Payroll keeps your team in TajirPoint: who works for you, their pay, their bank details and who to call in an emergency. Add employees by hand or bring in people who already log in to your shop.",
    "Mark attendance each day, one person at a time or the whole team at once, and see the month on one sheet. Staff leave requests go to a manager to approve, and leave balances keep count for you.",
    "At the end of the month, create a payroll run. Pay is worked out from attendance, leave and overtime, with a payslip for each person. When you finalise the run, the salary cost is recorded as an expense, and posted to your books if you use the Accounting add-on.",
  ],
  whoFor: [
    "Shops and restaurants with a team on monthly salaries",
    "Businesses that pay some staff by the hour",
    "Owners who track attendance in a register or on WhatsApp",
    "Managers who approve leave and want balances kept for them",
    "Restaurants that pay their own riders' delivery earnings with their wage",
  ],
  problems: [
    {
      problem: "Salary day means hours with the attendance register and a calculator.",
      fix: "Payroll reads the month's attendance and leave, works out each person's pay, and gives you a payslip for everyone.",
    },
    {
      problem: "Nobody knows how much leave anyone has left.",
      fix: "Leave types and yearly allowances are set up for you, and every approved request is taken off the balance.",
    },
    {
      problem: "Staff details are spread over phones and paper files.",
      fix: "One staff directory with ID card number, contact details, department, job title, bank account and emergency contact.",
    },
    {
      problem: "Salaries never show up properly in our expenses or profit.",
      fix: "Finalising a payroll run records the salary cost as an expense for that month.",
    },
  ],
  features: [
    {
      title: "Staff directory",
      body: "Each employee's details, department, job title, manager, type of employment, joining date, pay, bank account and emergency contact in one place.",
    },
    {
      title: "Shifts, holidays and weekly off",
      body: "Set shift times with a grace period for late arrival and a break, assign staff to shifts, and add public holidays.",
    },
    {
      title: "Daily attendance",
      body: "Mark present, absent, late, half day, on leave, holiday or weekly off with clock-in and clock-out times. Mark the whole team in one go and view the month on one sheet.",
    },
    {
      title: "Leave requests and approval",
      body: "Casual, sick, annual and unpaid leave are ready on install; add your own. Requests wait for a manager to approve or reject, and balances update by themselves.",
    },
    {
      title: "Monthly payroll with payslips",
      body: "Pay is worked out from attendance, leave and overtime, with a payslip per person showing how it was reached. Mark each payslip paid when you pay it.",
    },
    {
      title: "Hourly staff",
      body: "Pay hourly staff for the hours they actually clocked, with breaks taken off and overtime at the rate you set.",
    },
    {
      title: "Salary cost in your expenses",
      body: "Finalising a run records the month's salaries as an expense. With the Accounting add-on on, it is posted to your books as well.",
    },
    {
      title: "Clock in by QR code (restaurants)",
      body: "Restaurants can turn on QR clock-in, so staff clock in by scanning a changing code at the shop with their own phone.",
    },
  ],
  howItWorks: [
    {
      title: "Switch it on",
      body: "Install HR & Payroll from the Add-ons page in the back office. A General department and standard leave types are set up for you.",
    },
    {
      title: "Add your team",
      body: "Add each employee with their pay and details, and set up shifts and holidays.",
    },
    {
      title: "Mark attendance and handle leave",
      body: "Mark attendance each day and approve leave requests as they come in.",
    },
    {
      title: "Run payroll at month end",
      body: "Create the month's payroll run, check the payslips, then finalise it. Mark each payslip paid as you pay your staff.",
    },
  ],
  needs: [
    "A TajirPoint account on the Shop plan or above",
    "Each employee's pay and basic details",
    "Optional: the Accounting & General Ledger add-on, to post salaries to your books",
  ],
  setup: [
    "You switch it on yourself from the Add-ons page.",
    "HR & Payroll needs the Shop plan or above.",
    "Uninstalling keeps your staff, attendance and payroll records.",
  ],
  faqs: [
    {
      q: "Does it work out tax or pension deductions?",
      a: "No. Payroll works out pay from salary, attendance, leave and overtime, and you can add other earnings and deductions to a payslip. Income tax and other statutory deductions are not calculated for you.",
    },
    {
      q: "How are absences handled in pay?",
      a: "Pay is worked out per day. Days present and days on leave are paid, absent days are not, and a half day counts as half. Public holidays you add are left out of the month's working days.",
    },
    {
      q: "Can I pay some staff by the hour?",
      a: "Yes. Set an employee as hourly with an hourly rate, and their pay comes from the hours they clocked that month.",
    },
    {
      q: "Can I fix a payroll run after finalising it?",
      a: "Yes. A finalised run can be reopened to make corrections and then finalised again.",
    },
    {
      q: "Can staff clock in themselves?",
      a: "Restaurants can turn on QR clock-in, where staff scan a code shown at the shop with their phone. Otherwise a manager marks attendance.",
    },
    {
      q: "Can my own delivery riders be paid through payroll?",
      a: "Yes, if you turn it on. A rider who is also on your staff list can have their delivery earnings paid on the same payslip as their wage.",
    },
    {
      q: "Is it included in the free Light plan?",
      a: "No. HR & Payroll needs the Shop plan or above.",
    },
  ],
};

export default content;
