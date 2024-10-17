import { ObjectId } from 'mongoose';
import Gears, { Gear } from '../../../Models/Projects/Gear';
import projectsService from './project.service';

const findById = async (id: string | ObjectId): Promise<Gear | null> => {
  return await Gears.findById(id);
};

const findByProjectId = async (
  projectId: string | ObjectId,
): Promise<Gear[]> => {
  const project = await projectsService.findById(projectId);
  if (!project) {
    throw new Error('Project not found');
  }

  const gears: Gear[] = [];
  if (project.gearIds) {
    await Promise.all(
      project.gearIds.map(async gearId => {
        const gear = await findById(gearId);
        if (gear) {
          gears.push(gear);
        }
      }),
    );
  }

  return gears;
};

const findAll = async (): Promise<Gear[]> => {
  return await Gears.find({});
};

const add = async (gear: Gear, projectId: string | ObjectId): Promise<Gear> => {
  await Gears.validate(gear);

  const response = await Gears.create(gear);
  await projectsService.addGear(projectId, response._id);

  return response;
};

const update = async (
  id: string | ObjectId,
  gear: Gear,
): Promise<Gear | null> => {
  await Gears.validate(gear);

  return await Gears.findByIdAndUpdate(id, gear);
};

const remove = async (
  id: string | ObjectId,
  projectId: string | ObjectId,
): Promise<Gear | null> => {
  const response = await Gears.findByIdAndDelete(id);
  await projectsService.removeGear(projectId, id);
  return response;
};

const gearService = {
  findById,
  findByProjectId,
  findAll,
  add,
  update,
  remove,
};

export default gearService;
