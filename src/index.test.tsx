import { updateFieldSchema, deepEqual, isValueChanged } from './utils'
describe('updateFieldSchema', () => {
  it('should return correct update', () => {
    expect(
      updateFieldSchema(
        { values: { name: 'moha', lastName: 'akb' }, init: false },
        'values.name',
        'azi'
      )
    ).toEqual({ values: { name: 'azi', lastName: 'akb' }, init: false })
  })
})

describe('deep equal', () => {
  it('should return true for equal objects', () => {
    expect(
      deepEqual(
        { name: 'xxx', lastName: 'zzz' },
        { name: 'xxx', lastName: 'zzz' }
      )
    ).toBeTruthy()
  })
  it('should return true for null', () => {
    expect(deepEqual(null, null)).toBeTruthy()
  })
  it('should return false for null and object', () => {
    expect(deepEqual({ name: 'xxx', lastName: 'zzz' }, null)).toBeFalsy()
  })
  it('should return true for nested object', () => {
    expect(
      deepEqual(
        { name: 'xxx', lastName: 'zzz', address: { city: 'berlin' } },
        { name: 'xxx', lastName: 'zzz', address: { city: 'berlin' } }
      )
    ).toBeTruthy()
  })
})

describe('isValueChanged', () => {
  it('should return correct is changed values', () => {
    expect(
      isValueChanged(
        { name: 'moha', lastName: 'akb' },
        { name: 'Moha', lastName: 'Akb' }
      )
    ).toStrictEqual({ name: true, lastName: true })
    expect(
      isValueChanged(
        { name: 'moha', lastName: 'akb' },
        { name: 'Moha', lastName: 'akb' }
      )
    ).toStrictEqual({ name: true, lastName: false })
    expect(
      isValueChanged(
        { name: 'moha', lastName: 'akb' },
        { name: 'moha', lastName: 'akb' }
      )
    ).toStrictEqual({ name: false, lastName: false })
  })
})
