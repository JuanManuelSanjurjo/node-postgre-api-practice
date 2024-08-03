import { pool } from "../db.js";

export const getUsers = async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users");
    res.json(rows);
  } catch (err) {
    res.status(400).json({ msg: "Error getting users" });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query(`SELECT * FROM users where id =${id}`);
    if (rows.length === 0) {
      return res.status(404).json({ msg: "user not found" });
    }
    res.json(rows);
  } catch (err) {
    res.status(400).json({ msg: "Error getting user" });
  }
};

export const createUser = async (req, res) => {
  const { name, email } = req.body;
  try {
    const { rows, rowCount } = await pool.query(
      `INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *`,
      [name, email],
    );
    if (rowCount) {
      const response = { rows, rowCount, msg: "user created" };
      return res.json(response);
    }
    res.json({ msg: "User was not created" });
  } catch (err) {
    res.status(400).json({ msg: "Error creating user" });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows, rowCount } = await pool.query(
      `DELETE FROM users where id =${id} RETURNING *`,
    );
    if (rowCount) {
      const response = { rows, rowCount, msg: "user deleted" };
      return res.json(response);
    }
    return res.status(404).json({ msg: "user not found" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ msg: "Error deleting user" });
  }
};

export const modifyUser = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    const { rows, rowCount } = await pool.query(
      `UPDATE users SET name=$1, email=$2 where id=$3 RETURNING *`,
      [name, email, id],
    );
    if (rowCount) {
      const response = { rows, rowCount, msg: "user modified" };
      return res.json(response);
    }
    return res.status(404).json({ msg: "user not found" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ msg: "Error updating user" });
  }
};

