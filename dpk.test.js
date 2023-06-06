const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });
  it("Returns string partitionKey if the input has a partitionKey prop whose length is less than or equal 256", () => {
    const key = deterministicPartitionKey({ partitionKey: "test" });
    expect(key).toBe("test");
  });
  it("Returns sha3-512 hashed string partitionKey if the input has a partitionKey prop whose length is greater than 256", () => {
    const strLength300 = Array.from(Array(300), (_, index) => (index%10).toString()).join('');
    const result = "9d79934220062bde339de289d328fcac8d59bd134c03ad7144605cbaeff4b234256a8bdc2953dc7ca89c5027c4305e24ce58f9fb368841e1135c212862c916dd";
    const hashKey = deterministicPartitionKey({ partitionKey: strLength300 });
    expect(hashKey).toBe(result);
  });
  it("Returns sha3-512 hashed event content if there is no partitionKey prop", () => {
    const trivialKey = deterministicPartitionKey({ testProp: 'test' });
    const result = "c8395110b6d2f9c45f210867bbbfa6d66f2c3a0b57fd8b04b50083280e4bd7c2300e9f0513d513c6d0b833169bcc8390ac1045cd3fb044cae4e340ae0052edba";
    expect(trivialKey).toBe(result);
  });
});
