const { Port } = require("../script");

describe("Port", () => {
  const port = new Port("Dover");
  const titanic = jest.fn();
  const queenMary = jest.fn();

  it("can be instantiated", () => {
    expect(new Port()).toBeInstanceOf(Object);
  });

  it("has a starting port", () => {
    expect(port.name).toBe("Dover");
  });

  it("can add a ship", () => {
    port.addShip(titanic);

    expect(port.dockedShips).toContain(titanic);
  });

  it("can remove a ship", () => {
    port.addShip(titanic);
    port.addShip(queenMary);
    port.removeShip(titanic);

    expect(port.dockedShips).toEqual([queenMary]);
  });
});
