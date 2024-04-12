// Bookings.js
import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../styles/booking.css';
import { blockchainService } from '../services/blockchainServices';
import { Link } from 'react-router-dom';

export const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [editedGuests, setEditedGuests] = useState('');
  const [editedTime, setEditedTime] = useState('');
  const [modalMode, setModalMode] = useState('view');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const bookingDetails = await blockchainService.getBookingDetails();
        setBookings(bookingDetails);
        console.log(bookingDetails);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  const openModal = async (booking) => {
    setSelectedBooking(booking);
    setEditedName(booking.name);
    setEditedGuests(booking.numberOfGuests.toString());
    setEditedTime(booking.time.toString());
    setShowModal(true);
    setModalMode('view');
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleEdit = () => {
    setModalMode('edit');
  };

  const handleDelete = async () => {
    if (selectedBooking) {
      try {
        await blockchainService.removeBooking(selectedBooking.id);
        const updatedBookings = bookings.filter(
          (booking) => booking.id !== selectedBooking.id
        );
        setBookings(updatedBookings);
        closeModal();
      } catch (error) {
        console.error('Error deleting booking:', error);
      }
    }
  };

  const handleSaveChanges = async () => {
    if (selectedBooking) {
      try {
        await blockchainService.editBooking(
          selectedBooking.id,
          editedGuests,
          editedName,
          selectedBooking.date,
          selectedBooking.time
        );
        const updatedBookings = bookings.map((booking) => {
          if (booking.id === selectedBooking.id) {
            return {
              ...booking,
              numberOfGuests: editedGuests,
              name: editedName,
            };
          } else {
            return booking;
          }
        });
        setBookings(updatedBookings);
        closeModal();
      } catch (error) {
        console.error('Error editing booking:', error);
      }
    }
  };

  return (
    <div className="bookings-wrapper">
      <div className="bookings">
        <Table
          striped
          bordered
          hover
          variant="dark"
          className="booking-table imbue-variable"
        >
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Information</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking, index) => (
                <tr
                  key={index}
                  onClick={() => openModal(booking)}
                  className="booking-row"
                >
                  <td>{booking.id}</td>
                  <td>{booking.name}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">
                  <Link
                    to="/booktable"
                    className="no-bookings-message"
                  >
                    There are no bookings, please make a booking.
                  </Link>
                </td>
              </tr>
            )}
          </tbody>
        </Table>

        <Modal
          show={showModal}
          onHide={closeModal}
          centered
          className="imbue-variable"
        >
          <Modal.Header closeButton>
            <Modal.Title>{selectedBooking && selectedBooking.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {modalMode === 'view' && (
              <div>
                <p>
                  <strong>Booking ID:</strong>{' '}
                  {selectedBooking && selectedBooking.id}
                </p>
                <p>
                  <strong>Guests:</strong>{' '}
                  {selectedBooking && selectedBooking.numberOfGuests}
                </p>
                <p>
                  <strong>Date:</strong>{' '}
                  {selectedBooking && selectedBooking.date}
                </p>
                <p>
                  <strong>Time:</strong>{' '}
                  {selectedBooking && selectedBooking.time}
                </p>
              </div>
            )}
            {modalMode === 'edit' && (
              <Form className="edit-bookings-form">
                <Form.Group controlId="formBookingName">
                  <Form.Label style={{ marginBottom: '5px' }}>
                    Information
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="form-control booking-input"
                  />
                </Form.Group>
                <Form.Group controlId="formNumberOfGuests">
                  <Form.Label style={{ marginBottom: '5px' }}>
                    Number of Guests
                  </Form.Label>
                  <Form.Control
                    as="select"
                    value={editedGuests}
                    onChange={(e) => setEditedGuests(e.target.value)}
                    className="form-control booking-input"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="formTime">
                  <Form.Label style={{ marginBottom: '5px' }}>Time</Form.Label>
                  <Form.Control
                    as="select"
                    value={editedTime}
                    onChange={(e) => setEditedTime(e.target.value)}
                    className="form-control booking-input"
                  >
                    <option value="18">18:00</option>
                    <option value="21">21:00</option>
                  </Form.Control>
                </Form.Group>
              </Form>
            )}
          </Modal.Body>
          <Modal.Footer>
            {modalMode === 'view' && (
              <div>
                <Button
                  variant="danger"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
                <Button
                  variant="primary"
                  onClick={handleEdit}
                >
                  Edit
                </Button>
              </div>
            )}
            {modalMode === 'edit' && (
              <Button
                variant="primary"
                onClick={handleSaveChanges}
              >
                Save Changes
              </Button>
            )}
            <Button
              variant="secondary"
              onClick={closeModal}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};
