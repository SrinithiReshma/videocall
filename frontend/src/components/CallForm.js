import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createCall, updateCallById, fetchCallById } from '../redux/actions';

function CallForm() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentCall, loading } = useSelector(state => state.calls);

  const [formData, setFormData] = useState({
    title: '',
    participant: '',
    duration: '',
    status: 'scheduled',
    scheduledAt: ''
  });

  useEffect(() => {
    if (id) {
      dispatch(fetchCallById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (currentCall && id) {
      setFormData({
        title: currentCall.title,
        participant: currentCall.participant,
        duration: currentCall.duration,
        status: currentCall.status,
        scheduledAt: currentCall.scheduledAt ? new Date(currentCall.scheduledAt).toISOString().slice(0, 16) : ''
      });
    }
  }, [currentCall, id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await dispatch(updateCallById(id, formData));
      } else {
        await dispatch(createCall(formData));
      }
      navigate('/');
    } catch (error) {
      console.error('Error saving call:', error);
    }
  };

  if (loading && id) return <div className="loading">Loading...</div>;

  return (
    <div className="call-form">
      <h2>{id ? 'Edit Call' : 'Add New Call'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Participant:</label>
          <input
            type="text"
            name="participant"
            value={formData.participant}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Duration (minutes):</label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
            min="1"
          />
        </div>
        <div className="form-group">
          <label>Status:</label>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="scheduled">Scheduled</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <div className="form-group">
          <label>Scheduled At:</label>
          <input
            type="datetime-local"
            name="scheduledAt"
            value={formData.scheduledAt}
            onChange={handleChange}
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? 'Saving...' : (id ? 'Update Call' : 'Create Call')}
          </button>
          <button type="button" onClick={() => navigate('/')} className="btn-cancel">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default CallForm;