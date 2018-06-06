import React from 'react';
import AddBusinessForm from './AddBusinessForm';
import { addOneBusiness } from '../../actions/businessAction';

const AddBusiness = () => (
  <div className="add-business-cover">
    <div className="add-business container py-5 text-dark">
      <AddBusinessForm addOneBusiness={addOneBusiness} />
    </div>
  </div>

);

export default AddBusiness;

