"use client";
import React, { useState } from "react";

interface Props {
  // Props for the component
}
const RoleForm = (props: Props) => {
  // State variables for form fields and permissions
  const [roleName, setRoleName] = useState("");
  const [roleDescription, setRoleDescription] = useState("");
  const [permissions, setPermissions] = useState({
    orders: { view: false, export: false, update: false },
    products: {
      view: false,
      create: false,
      update: false,
      delete: false,
      export: false,
      import: false,
    },
    brands: { create: false },
    administration: { add_admin: false, add_role: false },
  });

  // Handler function for form submission
  const handleSubmit = (event: any) => {
    event.preventDefault();
    // Logic to submit role data to the backend
    console.log({ roleName, roleDescription, permissions });
  };

  // Handler function for permission checkbox change
  const handlePermissionChange = (category: any, permission: any) => {
    setPermissions((prevPermissions: any) => ({
      ...prevPermissions,
      [category]: {
        ...prevPermissions[category],
        [permission]: !prevPermissions[category][permission],
      },
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="roleName">Role Name:</label>
        <input
          type="text"
          id="roleName"
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="roleDescription">Role Description:</label>
        <textarea
          id="roleDescription"
          value={roleDescription}
          onChange={(e) => setRoleDescription(e.target.value)}
        />
      </div>
      <div>
        <h3>Permissions:</h3>
        <div>
          <label>Orders:</label>
          <input
            aria-label="View Orders"
            type="checkbox"
            checked={permissions.orders.view}
            onChange={() => handlePermissionChange("orders", "view")}
          />
          <label>View</label>
          <input
            aria-label="Export Orders"
            type="checkbox"
            checked={permissions.orders.export}
            onChange={() => handlePermissionChange("orders", "export")}
          />
          <label>Export</label>
          <input
            aria-label="Update Orders"
            type="checkbox"
            checked={permissions.orders.update}
            onChange={() => handlePermissionChange("orders", "update")}
          />
          <label>Update</label>
        </div>
        <div>
          <label>Products:</label>
          <input
            aria-label="View Products"
            type="checkbox"
            checked={permissions.products.view}
            onChange={() => handlePermissionChange("products", "view")}
          />
          <label>View</label>
          {/* Add other product permissions checkboxes */}
        </div>
        <div>
          <label>Brands:</label>
          <input
            aria-label="Create Brands"
            type="checkbox"
            checked={permissions.brands.create}
            onChange={() => handlePermissionChange("brands", "create")}
          />
          <label>Create</label>
        </div>
        <div>
          <label>Administration:</label>
          <input
            aria-label="Add Admin"
            type="checkbox"
            checked={permissions.administration.add_admin}
            onChange={() =>
              handlePermissionChange("administration", "add_admin")
            }
          />
          <label>Add Admin</label>
          <input
            aria-label="Add Role"
            type="checkbox"
            checked={permissions.administration.add_role}
            onChange={() =>
              handlePermissionChange("administration", "add_role")
            }
          />
          <label>Add Role</label>
        </div>
      </div>
      <button type="submit">Create Role</button>
    </form>
  );
};

export default RoleForm;
