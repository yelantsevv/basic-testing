// Uncomment the code below and write your tests
import {
  BankAccount,
  getBankAccount,
  TransferFailedError,
  SynchronizationFailedError,
  InsufficientFundsError,
} from '.';

const initialBalance = 100;
const checkSum = 10;

describe('BankAccount', () => {
  let account: BankAccount;
  beforeEach(() => {
    account = getBankAccount(initialBalance);
  });

  test('should create account with initial balance', () => {
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => account.withdraw(initialBalance + checkSum)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const accountTest = new BankAccount(0);
    expect(() =>
      account.transfer(initialBalance + checkSum, accountTest),
    ).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => account.transfer(checkSum, account)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    expect(account.deposit(checkSum).getBalance()).toBe(
      initialBalance + checkSum,
    );
  });

  test('should withdraw money', () => {
    expect(account.withdraw(checkSum).getBalance()).toBe(
      initialBalance - checkSum,
    );
  });

  test('should transfer money', () => {
    const accountTest = new BankAccount(0);

    expect(account.transfer(checkSum, accountTest).getBalance()).toBe(
      initialBalance - checkSum,
    );
    expect(accountTest.getBalance()).toBe(checkSum);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const balance = await account.fetchBalance();
    if (balance) {
      expect(typeof balance).toBe('number');
    } else {
      expect(balance).toBeNull();
    }
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const balance = await account.fetchBalance();
    if (balance) {
      // console.log('balance', account.getBalance());
      jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(balance);
      await account.synchronizeBalance();
      // console.log('New balance', account.getBalance());
      expect(account.getBalance()).toBe(balance);
    } else {
      expect(balance).toBeNull();
    }
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(account, 'fetchBalance').mockResolvedValueOnce(null);
    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
