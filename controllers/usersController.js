const pool = require('../db');
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
  const { username, password,email } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      'INSERT INTO usuario (usuario, contrasenia,email) VALUES ($1, $2, $3)',
      [username, hashedPassword,email]
    );
    res.status(201).json({ message: 'Usuario creado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear usuario' });
  }
};

const updatePassword = async (req, res) => {
  const { username, email, newPassword } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const result = await pool.query(
      'UPDATE usuario SET contrasenia = $1 WHERE usuario = $2 AND email = $3',
      [hashedPassword, username, email]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Usuario o correo no encontrado' });
    }

    res.json({ message: 'Contraseña actualizada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar contraseña' });
  }
};


module.exports = { createUser, updatePassword };	
