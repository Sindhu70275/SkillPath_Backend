import {
  createModuleService,
  getModuleByIdService,
  getModulesBySkillIdService,
  updateModuleService,
  deleteModuleService,
} from "../services/module.service.js";

export const createModule = async (req, res, next) => {
  try {
    console.log("Creating module with data:", req.body); // Debug log
    const module = await createModuleService(req.body);

    res.status(201).json({
      status: "success",
      message: "Module created successfully",
      data: module,
    });
  } catch (error) {
    next(error);
  }
};

export const getModuleById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const module = await getModuleByIdService(id);

    if (module) {
      res.status(200).json({
        status: "success",
        message: "Module retrieved successfully",
        data: module,
      });
    } else {
      res.status(404).json({
        status: "fail",
        message: "Module not found",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const getModulesBySkillId = async (req, res, next) => {
  try {
    const { skillId } = req.params;
    const modules = await getModulesBySkillIdService(skillId);

    res.status(200).json({
      status: "success",
      message: "Modules retrieved successfully",
      data: modules,
    });
  } catch (error) {
    next(error);
  }
};

export const updateModule = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedModule = await updateModuleService(id, updateData);

    if (updatedModule) {
      res.status(200).json({
        status: "success",
        message: "Module updated successfully",
        data: updatedModule,
      });
    } else {
      res.status(404).json({
        status: "fail",
        message: "Module not found",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteModule = async (req, res, next) => {
  try {
    const { id } = req.params;
    const module = await deleteModuleService(id);

    if (module) {
      res.status(200).json({
        status: "success",
        message: "Module deleted successfully",
      });
    } else {
      res.status(404).json({
        status: "fail",
        message: "Module not found",
      });
    }
  } catch (error) {
    next(error);
  }
};

