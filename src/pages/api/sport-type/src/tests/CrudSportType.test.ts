import createSportTypeService from "../services/CreateSportTypeService"
import createSportsService from "@/pages/api/sports/src/services/CreateSportsService"
import getAllSportTypeService from "../services/GetAllSportTypeService"
import getSportTypeByIDService from "../services/GetSportTypeByIDService"
import updateSportTypeService from "../services/UpdateSportTypeService"
import deleteSportTypeService from "../services/DeleteSportTypeService"
import { prisma } from "@/pages/api/config/prisma"

describe("CRUD Test Suite", () => {
    afterAll(async () => {
        await prisma.$disconnect()
    })

    beforeAll(async () => {
        await prisma.sportTypes.deleteMany()
        await prisma.sports.deleteMany()
    })

    afterEach(async () => {
        await prisma.sportTypes.deleteMany()
        await prisma.sports.deleteMany()
    })

    it("should be able to create a sport type", async () => {
        const reqSport = {
            body: {
                name: "Polo",
            },
        } as any

        const mockApiResponseSport: any = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        }

        await createSportsService(reqSport, mockApiResponseSport)

        expect(mockApiResponseSport.status).toHaveBeenCalledWith(201)

        const req = {
            body: {
                name: "Polo aquático",
                heightOfficial: 30,
                widthOfficial: 20,
                sportId: 1,
            },
        } as any

        const mockApiResponse: any = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        }

        await createSportTypeService(req, mockApiResponse)
    })

    it("should not be able to create a sport type with empty name", async () => {
        const reqSport = {
            body: {
                name: "Polo",
            },
        } as any

        const mockApiResponseSport: any = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        }

        await createSportsService(reqSport, mockApiResponseSport)

        expect(mockApiResponseSport.status).toHaveBeenCalledWith(201)

        const req = {
            body: {
                name: "",
                heightOfficial: 30,
                widthOfficial: 20,
                sportId: 1,
            },
        } as any

        const mockApiResponse: any = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        }

        try {
            await createSportTypeService(req, mockApiResponse)
        } catch (error) {
            expect((error as Error).message).toBe("Name is required")
            expect(mockApiResponse.status).toHaveBeenCalledWith(400)
            expect(mockApiResponse.json).toHaveBeenCalled()
        }
    })

    it("should not be able to create a sport type with name less than 2 characters", async () => {
        const reqSport = {
            body: {
                name: "Polo",
            },
        } as any

        const mockApiResponseSport: any = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        }

        await createSportsService(reqSport, mockApiResponseSport)

        expect(mockApiResponseSport.status).toHaveBeenCalledWith(201)

        const req = {
            body: {
                name: "A",
                heightOfficial: 30,
                widthOfficial: 20,
                sportId: 1,
            },
        } as any

        const mockApiResponse: any = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        }

        try {
            await createSportTypeService(req, mockApiResponse)
        } catch (error) {
            expect((error as Error).message).toBe("Name must be at least 2 characters")
            expect(mockApiResponse.status).toHaveBeenCalledWith(400)
            expect(mockApiResponse.json).toHaveBeenCalled()
        }
    })

    it("should not be able to create a sport type with name duplicated", async () => {
        const reqSport = {
            body: {
                name: "Polo",
            },
        } as any

        const mockApiResponseSport: any = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        }

        await createSportsService(reqSport, mockApiResponseSport)

        expect(mockApiResponseSport.status).toHaveBeenCalledWith(201)

        const req = {
            body: {
                name: "Polo aquático",
                heightOfficial: 30,
                widthOfficial: 20,
                sportId: 1,
            },
        } as any

        const mockApiResponse: any = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        }

        await createSportTypeService(req, mockApiResponse)

        const req2 = {
            body: {
                name: "Polo aquático",
                heightOfficial: 30,
                widthOfficial: 20,
                sportId: 1,
            },
        } as any

        const mockApiResponse2: any = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        }

        try {
            await createSportTypeService(req2, mockApiResponse2)
        } catch (error) {
            expect((error as Error).message).toBe("Name already exists")
            expect(mockApiResponse2.status).toHaveBeenCalledWith(400)
            expect(mockApiResponse2.json).toHaveBeenCalled()
        }
    })
})
