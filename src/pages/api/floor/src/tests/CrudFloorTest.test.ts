import getFloorByIDService from "../services/GetFloorByIDService"
import getAllFloorService from "../services/GetAllFloorService"
import createFloorService from "../services/CreateFloorService"
import { prisma } from "@/pages/api/config/prisma"

describe("CRUD Test Suite", () => {
    afterAll(async () => {
        await prisma.$disconnect()
    })

    beforeAll(async () => {
        await prisma.floor.deleteMany()
    })

    afterEach(async () => {
        await prisma.floor.deleteMany()
    })

    it("should be able to create a floor", async () => {
        const req = {
            body: {
                name: "Areia",
            },
        } as any

        const mockApiResponse: any = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        }

        await createFloorService(req, mockApiResponse)

        expect(mockApiResponse.status).toHaveBeenCalledWith(201)
        expect(mockApiResponse.json).toHaveBeenCalled()
    })

    it("should not be able to create a floor with empty name", async () => {
        const req = {
            body: {
                name: "",
            },
        } as any

        const mockApiResponse: any = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        }

        try {
            await createFloorService(req, mockApiResponse)
        } catch (error) {
            expect((error as Error).message).toBe("Name is required")
            expect(mockApiResponse.status).toHaveBeenCalledWith(400)
            expect(mockApiResponse.json).toHaveBeenCalled()
        }
    })

    it("should not be able to create a floor with name less than 2 characters", async () => {
        const req = {
            body: {
                name: "A",
            },
        } as any

        const mockApiResponse: any = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        }

        try {
            await createFloorService(req, mockApiResponse)
        } catch (error) {
            expect((error as Error).message).toBe("Name must be at least 2 characters")
            expect(mockApiResponse.status).toHaveBeenCalledWith(400)
            expect(mockApiResponse.json).toHaveBeenCalled()
        }
    })

    it("should not be able to create a floor with name greater than 100 characters", async () => {
        const req = {
            body: {
                name: "Areia".repeat(20),
            },
        } as any

        const mockApiResponse: any = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        }

        try {
            await createFloorService(req, mockApiResponse)
        } catch (error) {
            expect((error as Error).message).toBe("Name must be less than 100 characters")
            expect(mockApiResponse.status).toHaveBeenCalledWith(400)
            expect(mockApiResponse.json).toHaveBeenCalled()
        }
    })

    it("should not be able to create a floor with name  null", async () => {
        const req = {
            body: {
                name: null,
            },
        } as any

        const mockApiResponse: any = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        }

        try {
            await createFloorService(req, mockApiResponse)
        } catch (error) {
            expect((error as Error).message).toBe("Name is required")
            expect(mockApiResponse.status).toHaveBeenCalledWith(400)
            expect(mockApiResponse.json).toHaveBeenCalled()
        }
    })

    it("should not be able to create a floor with name duplicated", async () => {
        const req = {
            body: {
                name: "Areia",
            },
        } as any

        const mockApiResponse: any = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        }

        await createFloorService(req, mockApiResponse)

        const req2 = {
            body: {
                name: "Areia",
            },
        } as any

        try {
            await createFloorService(req2, mockApiResponse)
        } catch (error) {
            expect((error as Error).message).toBe("Floor already exists")
            expect(mockApiResponse.status).toHaveBeenCalledWith(400)
            expect(mockApiResponse.json).toHaveBeenCalled()
        }
    })

    it("should be able to get all floors", async () => {
        const req = {
            body: {
                name: "Areia",
            },
        } as any

        const mockApiResponse: any = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        }

        await createFloorService(req, mockApiResponse)

        const req2 = {
            body: {
                name: "Cimento",
            },
        } as any

        await createFloorService(req2, mockApiResponse)

        const getAllReq = {} as any

        const { data, status } = await getAllFloorService()

        expect(status).toBe(200)
        expect(data).toBeTruthy()
    })

    it("should return 404 for non-existent floor by id", async () => {
        const mockApiResponse: any = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        }

        const req = {
            query: {
                id: "d5842258-395f-483a-b3fe-b7017c2e131e",
            },
        } as any

        await getFloorByIDService(req, mockApiResponse)

        expect(mockApiResponse.status).toHaveBeenCalledWith(404)
        expect(mockApiResponse.json).toHaveBeenCalled()
        expect(mockApiResponse.json).toHaveBeenCalledWith({
            error: expect.stringContaining("Floor not found"),
        })
    })

    it("should be able to create a floor and get it by ID", async () => {
        const req = {
            body: {
                name: "Cimento",
            },
        } as any

        const mockApiResponse: any = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        }

        await createFloorService(req, mockApiResponse)

        expect(mockApiResponse.status).toHaveBeenCalledWith(201)
        expect(mockApiResponse.json).toHaveBeenCalled()

        const createdFloorId = mockApiResponse.json.mock.calls[0][0].id

        const getReq = {
            query: {
                id: createdFloorId,
            },
        } as any

        const getMockApiResponse: any = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        }

        await getFloorByIDService(getReq, getMockApiResponse)

        expect(getMockApiResponse.status).toHaveBeenCalledWith(200)
        expect(getMockApiResponse.json).toHaveBeenCalled()
    })
})
