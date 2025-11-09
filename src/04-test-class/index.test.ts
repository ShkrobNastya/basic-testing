// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const account = getBankAccount(50);
    expect(account.getBalance()).toBe(50);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const balance = 50;
    const account = getBankAccount(balance);
    expect(() => account.withdraw(100)).toThrow(InsufficientFundsError);
    expect(() => account.withdraw(100)).toThrow(
      `Insufficient funds: cannot withdraw more than ${balance}`,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const account1 = getBankAccount(100);
    const account2 = getBankAccount(50);
    expect(() => account1.transfer(120, account2)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(50);
    expect(() => account.transfer(5, account)).toThrow(TransferFailedError);
    expect(() => account.transfer(5, account)).toThrow('Transfer failed');
  });

  test('should deposit money', () => {
    const account = getBankAccount(50);
    account.deposit(5);
    expect(account.getBalance()).toBe(55);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(50);
    account.withdraw(5);
    expect(account.getBalance()).toBe(45);
  });

  test('should transfer money', () => {
    const account1 = getBankAccount(50);
    const account2 = getBankAccount(50);
    account1.transfer(10, account2);
    expect(account1.getBalance()).toBe(40);
    expect(account2.getBalance()).toBe(60);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(50);
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(5);
    const result = await account.fetchBalance();
    expect(result).toBe(5);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(50);
    const fetchMock = jest.spyOn(account, 'fetchBalance').mockResolvedValue(5);
    await account.synchronizeBalance();
    expect(fetchMock).toHaveBeenCalled();
    expect(account.getBalance()).toBe(5);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(50);
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);
    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
    await expect(account.synchronizeBalance()).rejects.toThrow(
      'Synchronization failed',
    );
  });
});
