describe("encryption", () => {
  test("e2e flow", async () => {
    const { encrypt, decrypt, generate_keypair } = await import(
      "../pkg/wasm_encryption.js"
    );
    const keypair = generate_keypair();
    console.log(keypair);
    //   expect(data).toBe("peanut butter");
  });
});
