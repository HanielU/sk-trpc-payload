import type { CollectionConfig } from "payload/types";

const Customers: CollectionConfig = {
  slug: "customers",
  auth: true,
  fields: [
    {
      name: "firstName",
      type: "text",
      required: true,
    },
    {
      name: "lastName",
      type: "text",
      required: true,
    },
    {
      name: "phoneNumber",
      type: "text",
      required: false,
    },
    {
      name: "dateOfBirth",
      type: "date",
      required: false,
    },
    {
      name: "gender",
      type: "select",
      hasMany: true,
      options: [
        {
          label: "Male",
          value: "male",
        },
        {
          label: "Female",
          value: "female",
        },
      ],
    },
    {
      name: "viewPost",
      type: "relationship",
      relationTo: "posts",
      hasMany: true,
    },
    {
      name: "likes",
      type: "relationship",
      relationTo: "posts",
      hasMany: true,
    },
    {
      name: "likeCount",
      type: "number",
      defaultValue: 0,
    },
  ],
};

export default Customers;
