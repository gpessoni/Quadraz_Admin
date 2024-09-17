// createSportsService.test.ts
import createSportsService from "../services/CreateSportsService";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/pages/api/config/prisma";

const mockApiResponse: Partial<NextApiResponse> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};
describe("CreateSportsService", () => {
  beforeAll(async () => {
    await prisma.sports.deleteMany();
  });

  afterEach(async () => {
    await prisma.sports.deleteMany();
  });

  it("should be able to create a sport", async () => {
    const req = {
      body: {
        name: "Futebol",
      },
    } as NextApiRequest;

    await createSportsService(req, mockApiResponse as NextApiResponse);

    expect(mockApiResponse.status).toHaveBeenCalledWith(201);
    expect(mockApiResponse.json).toHaveBeenCalled();
  });

  it("should not be able to create a sport with the same name", async () => {
    const req = {
      body: {
        name: "Futebol",
      },
    } as NextApiRequest;

    await createSportsService(req, mockApiResponse as NextApiResponse);

    try {
      await createSportsService(req, mockApiResponse as NextApiResponse);
    } catch (error) {
      expect((error as Error).message).toBe("Sport already exists");
      expect(mockApiResponse.status).toHaveBeenCalledWith(400);
      expect(mockApiResponse.json).toHaveBeenCalled();
    }
  });

  it("should not be able to create a sport with a name less than 3 characters", async () => {
    const req = {
      body: {
        name: "Fu",
      },
    } as NextApiRequest;

    try {
      await createSportsService(req, mockApiResponse as NextApiResponse);
    } catch (error) {
      expect((error as Error).message).toBe(
        "Name must be at least 3 characters"
      );
      expect(mockApiResponse.status).toHaveBeenCalledWith(400);
      expect(mockApiResponse.json).toHaveBeenCalled();
    }
  });

  it("should not be able to create a sport with a name greater than 100 characters", async () => {
    const req = {
      body: {
        name: "Futebol".repeat(20),
      },
    } as NextApiRequest;

    try {
      await createSportsService(req, mockApiResponse as NextApiResponse);
    } catch (error) {
      expect((error as Error).message).toBe(
        "Name must be less than 100 characters"
      );
      expect(mockApiResponse.status).toHaveBeenCalledWith(400);
      expect(mockApiResponse.json).toHaveBeenCalled();
    }
  });

  it("should not be able to create a sport with an empty name", async () => {
    const req = {
      body: {
        name: "",
      },
    } as NextApiRequest;

    try {
      await createSportsService(req, mockApiResponse as NextApiResponse);
    } catch (error) {
      expect((error as Error).message).toBe("Name cannot be empty");
      expect(mockApiResponse.status).toHaveBeenCalledWith(400);
      expect(mockApiResponse.json).toHaveBeenCalled();
    }
  });

  it("should not be able to create a sport without a name", async () => {
    const req = {
      body: {},
    } as NextApiRequest;

    try {
      await createSportsService(req, mockApiResponse as NextApiResponse);
    } catch (error) {
      expect((error as Error).message).toBe("Name is required");
      expect(mockApiResponse.status).toHaveBeenCalledWith(400);
      expect(mockApiResponse.json).toHaveBeenCalled();
    }
  });
});
