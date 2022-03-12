export const command_types = {
  FAN: 'FAN',
  WTR: 'WATERING',
  FTL: 'FERTILIZING',
}

export const command_statuses = {
  WAI: {text: 'WAITING', colour: null},
  PRC: {text: 'PROCESSING', colour: 'geekblue'},
  CPL: {text: 'COMPLETED', colour: 'lime'},
  CCL: {text: 'CANCELLED', colour: 'gray'},
  ERR: {text: 'ERROR', colour: 'red'},
}