import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchCalls, deleteCall } from '../redux/actions';

function CallList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { calls, loading, error } = useSelector(state => state.calls);

  useEffect(() => {
    dispatch(fetchCalls());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this call?')) {
      dispatch(deleteCall(id));
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="call-list">
      <h2>Video Calls</h2>
      {calls.length === 0 ? (
        <p className="no-calls">No calls found. Create your first call!</p>
      ) : (
        <div className="calls-grid">
          {calls.map(call => (
            <div key={call._id} className="call-card">
              <h3>{call.title}</h3>
              <p><strong>Participant:</strong> {call.participant}</p>
              <p><strong>Duration:</strong> {call.duration} minutes</p>
              <p><strong>Status:</strong> <span className={`status ${call.status}`}>{call.status}</span></p>
              <p><strong>Scheduled:</strong> {new Date(call.scheduledAt).toLocaleString()}</p>
              <div className="card-actions">
                <button onClick={() => navigate(`/call/${call._id}`)} className="btn-view">View</button>
                <button onClick={() => navigate(`/edit/${call._id}`)} className="btn-edit">Edit</button>
                <button onClick={() => handleDelete(call._id)} className="btn-delete">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CallList;