const { PrismaClient } = require("@prisma/client")
const fs = require("fs/promises")

const prisma = new PrismaClient()

async function main() {
    await prisma.$connect()
    await prisma.court.deleteMany()
    await prisma.equipment.deleteMany()
    await prisma.floor.deleteMany()
    await prisma.sportTypes.deleteMany()
    await prisma.sports.deleteMany()

    const floorsData = await getDataFromFile("floorsData.json")
    const sportsData = await getDataFromFile("sportsData.json")
    const sportsType = await getDataFromFile("sportsType.json")
    const equipments = await getDataFromFile("equipments.json")

    for (const floorData of floorsData) {
        await prisma.floor.create({
            data: floorData,
        })
    }

    for (const sportData of sportsData) {
        await prisma.sports.create({
            data: sportData,
        })
    }

    for (const equipment of equipments) {
        await prisma.equipment.create({
            data: equipment,
        })
    }

    for (const sportType of sportsType) {
        if (!sportType.sport) {
            console.error(`Invalid sport name for ${sportType.name}`)
            continue
        }

        const sport = await prisma.sports.findUnique({
            where: {
                name: sportType.sport,
            },
        })

        if (!sport) {
            console.error(`Sport not found for ${sportType.name}`)
            continue
        }

        await prisma.sportTypes.create({
            data: {
                name: sportType.name,
                heightOfficial: sportType.heightOfficial,
                widthOfficial: sportType.widthOfficial,
                sport: {
                    connect: {
                        id: sport.id,
                    },
                },
            },
        })
    }
}

async function getDataFromFile(fileName: string) {
    const filePath = `./prisma/json/${fileName}`
    try {
        const data = await fs.readFile(filePath, "utf-8")
        return JSON.parse(data)
    } catch (error: any) {
        console.error(`Error reading file ${filePath}: ${error.message}`)
        return []
    }
}

main()
    .catch((e) => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
