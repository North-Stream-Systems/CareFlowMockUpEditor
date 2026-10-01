import React from 'react';

export const V3      = 'CareFlow_Prototype_v3.html';
export const LOGIN_FILE = 'CareFlow_Login.html';
const CLIENTS = 'CareFlow_Clients.html';
const ROSTER  = 'CareFlow_Rostering.html';

export const NAV_LINKS = {
  Home:      `${V3}?screen=home`,
  Staff:     `${V3}?screen=staff`,
  Clients:   CLIENTS,
  Rostering: ROSTER,
  Finance:   null,
  Reports:   `${V3}?screen=reports`,
  Messages:  `${V3}?screen=messages`,
};
