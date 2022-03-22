const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token Contract", () => {
	let Token, hardhatToken, owner, add1, add2, addrs;

	beforeEach(async () => {
		Token = await ethers.getContractFactory("Token");
		[owner, add1, add2, ...addrs] = await ethers.getSigners();
		hardhatToken = await Token.deploy();
	});

	describe("Deployment", () => {
		it("Is owner set correctly", async () => {
			expect(await hardhatToken.owner()).to.equal(owner.address);
		});
		it("Is owner get all tokens", async () => {
			expect(await hardhatToken.showBalance(owner.address)).to.equal(
				await hardhatToken.total_supply()
			);
		});
	});

	describe("Transactions", () => {
		it("Should tokens transfered between owner and other account", async () => {
			await hardhatToken.transfer(add1.address, 1000);
			expect(await hardhatToken.showBalance(add1.address)).to.equal(1000);

			await hardhatToken.connect(add1).transfer(add2.address, 500);
			const add2Ba = await hardhatToken.showBalance(add2.address);
			expect(add2Ba).to.equal(500);
		});

		it("should fail when not enough balance", async () => {
			const initialOwnerBalance = await hardhatToken.showBalance(owner.address);
			await expect(
				hardhatToken.connect(add1).transfer(owner.address, 1)
			).to.be.revertedWith("Not Enough Balances.");
			expect(await hardhatToken.showBalance(owner.address)).to.equal(
				initialOwnerBalance
			);
		});

		it("Balance of all accounts updated or not.", async () => {
			const initialOwnerBalance = await hardhatToken.showBalance(owner.address);
			await hardhatToken.transfer(add1.address, 100);
			await hardhatToken.transfer(add2.address, 100);

			expect(await hardhatToken.showBalance(owner.address)).to.equal(
				initialOwnerBalance - 200
			);
			expect(await hardhatToken.showBalance(add1.address)).to.equal(100);
			expect(await hardhatToken.showBalance(add2.address)).to.equal(100);

			await hardhatToken.connect(add1).transfer(add2.address, 50);
			expect(await hardhatToken.showBalance(add1.address)).to.equal(50);
			expect(await hardhatToken.showBalance(add2.address)).to.equal(150);
		});
	});
});
