"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
const utils_1 = require("@medusajs/utils");
async function POST(req, res) {
    const eventService = req.scope.resolve(utils_1.Modules.EVENT_BUS);
    await eventService.emit({
        name: 'meilisearch.sync',
        data: {},
    });
    res.send({
        message: 'Syncing data to Meilisearch',
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvYXBpL2FkbWluL21laWxpc2VhcmNoL3N5bmMvcm91dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFPQSxvQkFTQztBQWZELDJDQUF5QztBQU1sQyxLQUFLLFVBQVUsSUFBSSxDQUFDLEdBQWtCLEVBQUUsR0FBc0M7SUFDbkYsTUFBTSxZQUFZLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsZUFBTyxDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBQ3pELE1BQU0sWUFBWSxDQUFDLElBQUksQ0FBQztRQUN0QixJQUFJLEVBQUUsa0JBQWtCO1FBQ3hCLElBQUksRUFBRSxFQUFFO0tBQ1QsQ0FBQyxDQUFBO0lBQ0YsR0FBRyxDQUFDLElBQUksQ0FBQztRQUNQLE9BQU8sRUFBRSw2QkFBNkI7S0FDdkMsQ0FBQyxDQUFBO0FBQ0osQ0FBQyJ9