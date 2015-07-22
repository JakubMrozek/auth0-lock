import React from 'react';
import Lock from '../lock/lock';
import AskCode from './ask_code';
import AskPhoneNumber from './ask_phone_number';
import SelectCountryCode from './select_country_code';
import { LockStates } from '../control/constants';
import { requestPasswordlessSMS, signIn } from './actions';

export default function render(lock) {
  const state = lock.get("state");
  switch(state) {
  case LockStates.ASK_CODE:
    return (
      <Lock lock={lock} showHeader={true} submitHandler={askCodeSubmitHandler}>
        <AskCode />
      </Lock>
    );
  case LockStates.READY:
    return (
      <Lock lock={lock} showHeader={true} submitHandler={askPhoneNumberSubmitHandler}>
        <AskPhoneNumber />
      </Lock>
    );
  case LockStates.SELECT_COUNTRY_CODE:
    return (
      <Lock lock={lock} showHeader={true}>
        <SelectCountryCode />
      </Lock>
    );
  default:
    const mode = lock.get("mode");
    throw new Error(`unknown state ${state} for mode ${mode}`)
  }
}

function askPhoneNumberSubmitHandler(lock) {
  requestPasswordlessSMS(lock.get("id"));
}

function askCodeSubmitHandler(lock) {
  signIn(lock.get("id"));
}