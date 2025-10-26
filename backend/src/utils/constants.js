const RECORD_STATUS = {
  DRAFT: '00',
  SUBMITTED: '01',
  VERIFIED: '02',
  EXPORTED: '03',
  APPROVED: '04',
  REJECTED: '05',
};

const ROLES = {
  SUPPLIER: 'supplier',
  ADMIN: 'admin',
};

const RECORD_STATUS_FLOW = {
  submit: {
    from: RECORD_STATUS.DRAFT,
    to: RECORD_STATUS.SUBMITTED,
  },
  verify: {
    from: RECORD_STATUS.SUBMITTED,
    to: RECORD_STATUS.VERIFIED,
  },
  export: {
    from: RECORD_STATUS.VERIFIED,
    to: RECORD_STATUS.EXPORTED,
  },
};

module.exports = {
  RECORD_STATUS,
  RECORD_STATUS_FLOW,
  ROLES,
};
