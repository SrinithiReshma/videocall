import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCallById, deleteCall } from '../redux/actions';

function CallDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentCall, loading, error } = useSelector(state => state.calls);

  useEffect(() => {
    dispatch(fetchCallById(id));
  }, [id, dispatch]);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this call?')) {
      dispatch(deleteCall(id));
      navigate('/');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!currentCall) return <div className="error">Call not found</div>;

  return (
    <div className="call-details">
      <h2>Call Details</h2>
      <div className="details-card">
        <div className="detail-row">
          <strong>Title:</strong>
          <span>{currentCall.title}</span>
        </div>
        <div className="detail-row">
          <strong>Participant:</strong>
          <span>{currentCall.participant}</span>
        </div>
        <div className="detail-row">
          <strong>Duration:</strong>
          <span>{currentCall.duration} minutes</span>
        </div>
        <div className="detail-row">
          <strong>Status:</strong>
          <span className={`status ${currentCall.status}`}>{currentCall.status}</span>
        </div>
        <div className="detail-row">
          <strong>Scheduled At:</strong>
          <span>{new Date(currentCall.scheduledAt).toLocaleString()}</span>
        </div>
        <div className="detail-row">
          <strong>Created:</strong>
          <span>{new Date(currentCall.createdAt).toLocaleString()}</span>
        </div>
        <div className="detail-row">
          <strong>Updated:</strong>
          <span>{new Date(currentCall.updatedAt).toLocaleString()}</span>
        </div>
        <div className="details-actions">
          <button onClick={() => navigate(`/edit/${id}`)} className="btn-edit">Edit</button>
          <button onClick={handleDelete} className="btn-delete">Delete</button>
          <button onClick={() => navigate('/')} className="btn-back">Back to List</button>
        </div>
      </div>
    </div>
  );
}

export default CallDetails;