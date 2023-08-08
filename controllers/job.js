const Job = require("../models/Job");
const { badRequestError, notFoundError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const getAllJob = async (req, res) => {
  const job = await Job.find({ createdBy: req.user.userId }).sort("createdAt");
  res.status(StatusCodes.OK).json({ count: job.length, job });
};

const getJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: JobId },
  } = req;
  const job = await Job.findOne({ _id: JobId, createdBy: userId });
  if (!job) {
    throw new notFoundError(`No Job with Id ${JobId}`);
  }
  res.status(StatusCodes.OK).json({ job });
};

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

const updateJob = async (req, res) => {
  const {
    body: { company, position },
    user: userId,
    params: { id: JobId },
  } = req;

  if (company == "" || position == "") {
    throw new badRequestError("Please provide information.");
  }

  const job = await Job.findByIdAndUpdate(
    { _id: JobId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!job) {
    throw new notFoundError(`No Job with Id ${JobId}`);
  }
  res.status(StatusCodes.OK).json({ job });
};

const deleteJob = async (req, res) => {
  const {
    user: userId,
    params: { id: JobId },
  } = req;

  const job = await Job.findByIdAndRemove({ _id: JobId, createdBy: userId });
  if (!job) {
    throw new notFoundError(`No Job with Id ${JobId}`);
  }
  res.status(StatusCodes.OK).send();
};

module.exports = { getAllJob, getJob, createJob, updateJob, deleteJob };
