import React from 'react';
import { render } from '@testing-library/react';
import SweepstakesTableCoupon from '../components/sweepstakes/innerComponents/SweepstateTable/tableComponents/SweepstakeTableCoupon';
import { unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

const props = {
  currentSelectedTickets: [0, 1, 2, 30, 20],
};

const propsSecondary = {
  currentSelectedTickets: [0, 1, 2, 30],
};

let container: any = null;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('test sweepstake table coupoun component', async () => {
  const { findByTestId } = render(
    <SweepstakesTableCoupon {...props} />,
    container
  );
  const loginForm = await findByTestId('table-coupon');

  expect(loginForm).toBeDefined();

  const total = await findByTestId('table-coupon-total');

  expect(total.textContent).toBe('TOTAL: R$   120,00');
});

it('test sweepstake table coupoun component', async () => {
  const { findByTestId } = render(
    <SweepstakesTableCoupon {...propsSecondary} />,
    container
  );

  const total = await findByTestId('table-coupon-total');

  expect(total.textContent).toBe('TOTAL: R$   90,00');
});
