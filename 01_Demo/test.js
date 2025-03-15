import React, { useState, useRef } from 'react';

const WorkflowManager = () => {
  // General form data
  const [generalForm, setGeneralForm] = useState({
    name: '',
    description: '',
    type: '',
    parallelApprovals: false
  });

  // Stage cards data
  const [stageCards, setStageCards] = useState([
    {
      id: 1,
      stageNumber: 1,
      minApprovers: 1,
      userGroup: '',
      approversList: []
    }
  ]);

  // Drag and drop refs
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  // Handle general form changes
  const handleGeneralFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setGeneralForm({
      ...generalForm,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Handle stage form changes
  const handleStageFormChange = (e, id) => {
    const { name, value } = e.target;
    setStageCards(prevCards => 
      prevCards.map(card => 
        card.id === id ? { ...card, [name]: value } : card
      )
    );
  };

  // Clear general form
  const clearGeneralForm = () => {
    setGeneralForm({
      name: '',
      description: '',
      type: '',
      parallelApprovals: false
    });
  };

  // Clear stage form - keep only first card
  const clearStageForm = () => {
    const firstCard = stageCards[0];
    setStageCards([
      {
        ...firstCard,
        stageNumber: 1,
        minApprovers: 1,
        userGroup: '',
        approversList: []
      }
    ]);
  };

  // Add new card after the specified card
  const addCard = (afterId) => {
    const newId = Math.max(...stageCards.map(card => card.id)) + 1;
    
    const newCard = {
      id: newId,
      stageNumber: afterId === 'bottom' ? stageCards.length + 1 : null, // will be adjusted below
      minApprovers: 1,
      userGroup: '',
      approversList: []
    };

    let newCards;
    
    if (afterId === 'bottom') {
      // Add to bottom
      newCards = [...stageCards, newCard];
    } else {
      // Add after specific card
      const afterIndex = stageCards.findIndex(card => card.id === afterId);
      newCards = [
        ...stageCards.slice(0, afterIndex + 1),
        newCard,
        ...stageCards.slice(afterIndex + 1)
      ];
    }

    // Update stage numbers to be sequential
    newCards = newCards.map((card, index) => ({
      ...card,
      stageNumber: index + 1
    }));

    setStageCards(newCards);
  };

  // Remove card
  const removeCard = (id) => {
    if (stageCards.length <= 1) {
      return; // Don't remove the last card
    }

    let newCards = stageCards.filter(card => card.id !== id);
    
    // Update stage numbers to be sequential
    newCards = newCards.map((card, index) => ({
      ...card,
      stageNumber: index + 1
    }));

    setStageCards(newCards);
  };

  // Handle drag start
  const handleDragStart = (e, position) => {
    dragItem.current = position;
  };

  // Handle drag over
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Handle drag enter
  const handleDragEnter = (e, position) => {
    dragOverItem.current = position;
  };

  // Handle drop to reorder cards
  const handleDrop = (e) => {
    const copyCards = [...stageCards];
    const dragItemContent = copyCards[dragItem.current];
    copyCards.splice(dragItem.current, 1);
    copyCards.splice(dragOverItem.current, 0, dragItemContent);
    
    // Update stage numbers while preserving the logical order
    const reorderedCards = copyCards.map((card, index) => ({
      ...card,
      stageNumber: index + 1
    }));
    
    dragItem.current = null;
    dragOverItem.current = null;
    setStageCards(reorderedCards);
  };

  // Handle save - sending both forms data
  const handleSave = async () => {
    const payload = {
      generalForm,
      stageCards
    };
    
    console.log('Saving payload:', payload);
    
    try {
      // Replace with your actual API endpoint
      // const response = await fetch('your-api-endpoint', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(payload),
      // });
      // const data = await response.json();
      // console.log('Success:', data);
      
      alert('Workflow saved successfully!');
    } catch (error) {
      console.error('Error saving workflow:', error);
      alert('Failed to save workflow.');
    }
  };

  return (
    <div className="workflow-container" style={styles.container}>
      <div className="workflow-header" style={styles.header}>
        <h2>Add Workflow</h2>
        <button style={styles.closeButton}>×</button>
      </div>

      <div className="workflow-content" style={styles.content}>
        {/* General Form */}
        <div className="general-form" style={styles.formSection}>
          <div style={styles.sectionHeader}>
            <h3>General</h3>
            <button 
              onClick={clearGeneralForm}
              style={styles.clearButton}
            >
              Clear General Form
            </button>
          </div>

          <div style={styles.formContent}>
            <div style={styles.formGroup}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={generalForm.name}
                onChange={handleGeneralFormChange}
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <input
                type="text"
                name="description"
                placeholder="Description"
                value={generalForm.description}
                onChange={handleGeneralFormChange}
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <div style={styles.selectWrapper}>
                <select
                  name="type"
                  value={generalForm.type}
                  onChange={handleGeneralFormChange}
                  style={styles.select}
                >
                  <option value="">Type</option>
                  <option value="type1">Type 1</option>
                  <option value="type2">Type 2</option>
                  <option value="type3">Type 3</option>
                </select>
              </div>
            </div>

            <div style={styles.checkboxGroup}>
              <input
                type="checkbox"
                id="parallelApprovals"
                name="parallelApprovals"
                checked={generalForm.parallelApprovals}
                onChange={handleGeneralFormChange}
              />
              <label htmlFor="parallelApprovals">Parallel Approvals</label>
            </div>
          </div>
        </div>

        {/* Stage Definition Section */}
        <div className="stage-definition" style={styles.formSection}>
          <div style={styles.sectionHeader}>
            <h3>Stage Definition</h3>
            <button 
              onClick={clearStageForm}
              style={styles.clearButton}
            >
              Clear Stage Form
            </button>
          </div>

          {/* Stage Cards */}
          {stageCards.map((card, index) => (
            <div 
              key={card.id}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDragEnter={(e) => handleDragEnter(e, index)}
              onDrop={handleDrop}
              style={index === 0 ? styles.stageCard : styles.stageCardHighlighted}
            >
              <div style={styles.stageCardRow}>
                <div style={styles.formGroupHalf}>
                  <input
                    type="number"
                    name="stageNumber"
                    placeholder="Stage Number"
                    value={card.stageNumber}
                    onChange={(e) => handleStageFormChange(e, card.id)}
                    style={styles.input}
                    readOnly // Stage number is auto-managed
                  />
                </div>
                <div style={styles.formGroupHalf}>
                  <input
                    type="number"
                    name="minApprovers"
                    placeholder="Minimum Approvers"
                    value={card.minApprovers}
                    onChange={(e) => handleStageFormChange(e, card.id)}
                    style={styles.input}
                  />
                </div>
                <div style={styles.buttonGroup}>
                  <button 
                    onClick={() => addCard(card.id)}
                    style={styles.addButton}
                  >
                    Add
                  </button>
                  <button 
                    onClick={() => removeCard(card.id)}
                    style={styles.removeButton}
                    disabled={stageCards.length <= 1}
                  >
                    Remove
                  </button>
                </div>
              </div>

              <div style={styles.formGroup}>
                <input
                  type="text"
                  name="userGroup"
                  placeholder="Search User Group"
                  value={card.userGroup}
                  onChange={(e) => handleStageFormChange(e, card.id)}
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <div style={styles.approversList}>
                  <div style={styles.approversListHeader}>
                    <span>Approvers List</span>
                    <button style={styles.expandButton}>↗</button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Bottom Add Button */}
          <div style={styles.bottomAddButtonContainer}>
            <button 
              onClick={() => addCard('bottom')}
              style={styles.bottomAddButton}
            >
              Add
            </button>
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="workflow-footer" style={styles.footer}>
        <button style={styles.cancelButton}>Cancel</button>
        <button 
          onClick={handleSave}
          style={styles.saveButton}
        >
          Save
        </button>
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    border: '1px solid #ddd',
    borderRadius: '5px',
    maxWidth: '1200px',
    margin: '0 auto',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    borderBottom: '1px solid #ddd',
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
  },
  content: {
    display: 'flex',
    padding: '20px',
    gap: '20px',
  },
  formSection: {
    flex: 1,
    padding: '10px',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
  },
  clearButton: {
    backgroundColor: '#f0f0f0',
    border: '1px solid #ddd',
    borderRadius: '4px',
    padding: '5px 10px',
    cursor: 'pointer',
  },
  formContent: {
    border: '1px solid #ddd',
    padding: '15px',
    borderRadius: '4px',
  },
  formGroup: {
    marginBottom: '15px',
  },
  formGroupHalf: {
    flex: 1,
    marginRight: '10px',
  },
  input: {
    width: '100%',
    padding: '8px 12px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
  },
  selectWrapper: {
    position: 'relative',
  },
  select: {
    width: '100%',
    padding: '8px 12px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    appearance: 'none',
  },
  checkboxGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  stageCard: {
    border: '1px solid #ddd',
    padding: '15px',
    borderRadius: '4px',
    marginBottom: '15px',
    cursor: 'grab',
    backgroundColor: '#fff',
  },
  stageCardHighlighted: {
    border: '1px solid #ddd',
    padding: '15px',
    borderRadius: '4px',
    marginBottom: '15px',
    cursor: 'grab',
    backgroundColor: '#f9f9f9',
  },
  stageCardRow: {
    display: 'flex',
    gap: '10px',
    marginBottom: '15px',
  },
  buttonGroup: {
    display: 'flex',
    gap: '5px',
  },
  addButton: {
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '5px 10px',
    cursor: 'pointer',
  },
  removeButton: {
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '5px 10px',
    cursor: 'pointer',
  },
  approversList: {
    border: '1px solid #ddd',
    borderRadius: '4px',
    padding: '10px',
  },
  approversListHeader: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  expandButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
  bottomAddButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: '15px 0',
  },
  bottomAddButton: {
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '5px 20px',
    cursor: 'pointer',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '15px 20px',
    borderTop:






const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    border: '1px solid #ddd',
    borderRadius: '5px',
    maxWidth: '1200px',
    margin: '0 auto',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    borderBottom: '1px solid #ddd',
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
  },
  content: {
    display: 'flex',
    padding: '20px',
    gap: '20px',
  },
  formSection: {
    flex: 1,
    padding: '10px',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
  },
  clearButton: {
    backgroundColor: '#f0f0f0',
    border: '1px solid #ddd',
    borderRadius: '4px',
    padding: '5px 10px',
    cursor: 'pointer',
  },
  formContent: {
    border: '1px solid #ddd',
    padding: '15px',
    borderRadius: '4px',
  },
  formGroup: {
    marginBottom: '15px',
  },
  formGroupHalf: {
    flex: 1,
    marginRight: '10px',
  },
  input: {
    width: '100%',
    padding: '8px 12px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
  },
  selectWrapper: {
    position: 'relative',
  },
  select: {
    width: '100%',
    padding: '8px 12px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    appearance: 'none',
  },
  checkboxGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  stageCard: {
    border: '1px solid #ddd',
    padding: '15px',
    borderRadius: '4px',
    marginBottom: '15px',
    cursor: 'grab',
    backgroundColor: '#fff',
  },
  stageCardHighlighted: {
    border: '1px solid #ddd',
    padding: '15px',
    borderRadius: '4px',
    marginBottom: '15px',
    cursor: 'grab',
    backgroundColor: '#f9f9f9',
  },
  stageCardRow: {
    display: 'flex',
    gap: '10px',
    marginBottom: '15px',
  },
  buttonGroup: {
    display: 'flex',
    gap: '5px',
  },
  addButton: {
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '5px 10px',
    cursor: 'pointer',
  },
  removeButton: {
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '5px 10px',
    cursor: 'pointer',
  },
  approversList: {
    border: '1px solid #ddd',
    borderRadius: '4px',
    padding: '10px',
  },
  approversListHeader: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  expandButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
  bottomAddButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: '15px 0',
  },
  bottomAddButton: {
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '5px 20px',
    cursor: 'pointer',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '15px 20px',
    borderTop: '1px solid #ddd',
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
    border: '1px solid #ddd',
    borderRadius: '4px',
    padding: '8px 16px',
    cursor: 'pointer',
  },
  saveButton: {
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '8px 16px',
    cursor: 'pointer',
  }
};

export default WorkflowManager;
