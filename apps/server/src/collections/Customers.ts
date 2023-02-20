import type { Customer } from "payload/generated-types";
import type { CollectionConfig, FieldHook } from "payload/types";

const AfterLikesChange: FieldHook<Customer> = async ({
  req,
  originalDoc,
  operation,
}) => {
  if (operation === "update") {
    if (req.payload) {
      const likeCount = originalDoc.likes.length; // needs to be here because it doesn't work in the data object for some reason
      req.payload.update({
        collection: "customers",
        id: originalDoc.id,
        data: { likeCount },
      });
    }
  }
};

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
      name: "country",
      type: "text",
      required: false,
    },
    {
      name: "state",
      type: "text",
      required: false,
    },
    {
      name: "postalCode",
      type: "text",
      required: false,
    },
    {
      name: "address",
      type: "textarea",
      required: false,
    },
    {
      name: "nameOfNextKin",
      type: "text",
      required: false,
    },
    {
      name: "phoneOfNextKin",
      type: "text",
      required: false,
    },
    {
      name: "emailOfNextKin",
      type: "text",
      required: false,
    },
    {
      name: "condition",
      type: "text",
      required: false,
    },
    {
      name: "bloodPressure",
      type: "text",
      required: false,
    },
    {
      name: "bloodSugar",
      type: "text",
      required: false,
    },
    {
      name: "hba1cReading",
      type: "text",
      required: false,
    },
    {
      name: "bodyMassIndex",
      type: "text",
      required: false,
    },
    {
      name: "weight",
      type: "text",
      required: false,
    },
    {
      name: "height",
      type: "text",
      required: false,
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
      hooks: {
        afterChange: [AfterLikesChange],
      },
    },
    {
      name: "likeCount",
      type: "number",
      defaultValue: 0,
    },
  ],
};

// fetch("/api/collections/customers", {
//   method: "POST",
//   body: JSON.stringify({
//     firstName: "John",
//     email: "test@google.com",
//     password: "123456",
//   }),
// })

export default Customers;
