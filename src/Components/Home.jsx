import React, { useState, useEffect } from 'react';
import "./Home.css";

function Home() {
  const [showModal, setShowModal] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    department: ''
  });
  const [editId, setEditId] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const fetchEmployees = async () => {
    try {
      const response = await fetch('http://localhost:5000/user');
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editId ? `http://localhost:5000/user/${editId}` : 'http://localhost:5000/user';
      const method = editId ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      console.log('New employee added:', data);
      fetchEmployees();
      setShowModal(false);
      setFormData({ firstname: '', lastname: '', email: '', department: '' });
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  const handleEdit = (id) => {
    const employee = employees.find(emp => emp.id === id);
    if (employee) {
      setEditId(id);
      setFormData({
        firstname: employee.firstname,
        lastname: employee.lastname,
        email: employee.email,
        department: employee.department
      });
      setShowModal(true);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        const response = await fetch(`http://localhost:5000/user/${id}`, {
          method: 'DELETE'
        });
        console.log('Employee deleted:', response);
        fetchEmployees();
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="container">
      <button className="add-employee-btn" onClick={() => {
        setEditId(null);
        setShowModal(true);
      }}>Add Employee</button>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setShowModal(false)}>Close</button>
            <form className="form" onSubmit={handleSubmit}>
              <label>First Name:</label>
              <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} required />
              <label>Last Name:</label>
              <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} required />
              <label>Email:</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
              <label>Department:</label>
              <input type="text" name="department" value={formData.department} onChange={handleChange} required />
              <button type="submit">Save</button>
            </form>
          </div>
        </div>
      )}
      <table className="employee-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(employee => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.firstname}</td>
              <td>{employee.lastname}</td>
              <td>{employee.email}</td>
              <td>{employee.department}</td>
              <td>
                <button onClick={() => handleEdit(employee.id)}>Edit</button>
                <button onClick={() => handleDelete(employee.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <label>Rows per page:</label>
        <select value={rowsPerPage} onChange={handleChangeRowsPerPage}>
          <option value={5}>5</option>
          <option value={10}>10</option>
        </select>
        <button onClick={() => setPage(page - 1)} disabled={page === 0}>Previous</button>
        <button onClick={() => setPage(page + 1)} disabled={(page + 1) * rowsPerPage >= employees.length}>Next</button>
      </div>
    </div>
  );
}

export default Home;
