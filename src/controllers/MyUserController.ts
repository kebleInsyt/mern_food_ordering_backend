import { Request, Response } from "express";
import User from "../models/user";

export const createCurrentUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { auth0Id } = req.body;
    const existingUser = await User.findOne({ auth0Id });

    if (existingUser) {
      res.status(200).json(null);
      return;
    }

    const newUser = new User(req.body);
    await newUser.save();

    res.status(201).json(newUser.toObject());
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

export const updateCurrentUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, addressLine1, city, country } = req.body;
    const user = await User.findById(req.userId);

    if (!user) {
      res.status(404).json({ message: "user not found" });
      return;
    }
    user.name = name;
    user.addressLine1 = addressLine1;
    user.country = country;
    user.city = city;

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

export const getCurrentUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const currentUser =  await User.findOne({ _id: req.userId});

    if (!currentUser) {
      res.status(404).json({ message: "User not found" });
      return;
    } 
    
     res.status(201).json(currentUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
}