// modules/shared/constants.js

const ROLES = {
  SUPER_ADMIN: 'SUPER-ADMIN',
  ADMIN: 'ADMIN',
  CLIENT: 'CLIENT',
};

const SERVICES = [
  // Home X-Ray Services
  'Chest X-ray',
  'Spine X-ray',
  'Pelvis & Joint X-ray',
  'Shoulder & Hand X-ray',
  'Knee & Ankle X-ray',
  'Head & Facial X-ray',
  // Lab Tests & Sample Collection
  'Blood Tests',
  'Urine Analysis',
  'Stool Analysis',
  'Hormone Tests',
  'Vitamin Tests',
  'Viral Tests',
  // Home Nursing Services
  'Intramuscular Injections',
  'Intravenous Injections',
  'Cannula Insertion',
  'IV Fluid Administration',
  'Urinary Catheter Insertion',
  'Wound Care & Dressing Changes',
  'Bed Sore Care',
  'Blood Pressure Monitoring',
  'Blood Glucose Monitoring',
  'IV Medication Administration',
  'Elderly Care',
  'In-Home Nursing (12 Hours / 24 Hours)'
];

const RESERVATION_STATUS = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  COMPLETED: 'COMPLETED',
  REJECTED: 'REJECTED'
};

module.exports = {
  ROLES,
  SERVICES,
  RESERVATION_STATUS
};
