beforeEach(() => {
  console.log("テスト前に走るよ!!!");
});

afterEach(() => {
  console.log("テストが終わったよ!!!");
});

describe("sample", () => {
  it("sample", () => {
    console.log("テスト始めまーす!!");
    const result = 1 + 3;
    expect(result).toBe(4);
  });
});
