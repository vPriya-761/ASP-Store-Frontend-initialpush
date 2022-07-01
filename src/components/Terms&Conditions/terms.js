import { Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

export const terms = [
  {
    heading: "OVERVIEW",
    content: [
      "Our refund and returns policy lasts based on the time limit given by the vendors. If not time limit has been set, it is said to be no return and refund product.",
      "To be eligible for a return, your item must be unused and in the same condition that you received it. It must also be in the original packaging.",
      "Several types of goods are exempt from being returned. Perishable goods such as food, flowers, newspapers or magazines can returned. We also do not accept products that are intimate or sanitary  goods, hazardous materials, or flammable liquids or gases.",
    ],
    addIcon: <AddIcon />,
    expandLess: <ExpandLess />,
    expandMore: <ExpandMore />,
  },
  {
    heading: "ADDITIONAL INFO",
    modifiedContent: [
      {
        productFirstType: [
          "Gift cards",
          "Downloadable software products",
          "Some health and personal care items",
        ],
        guideLines: [
          "To complete your return, we require a receipt or proof of purchase.",
          "Please do not send your purchase back to the manufacturer.",
          "There are certain situations where only partial refunds are granted:",
        ],
        productSecondType: [
          "Book with obvious signs of use",
          "CD, DVD, VHS tape, software, video game, cassette tape, or vinyl record that has been opened.",
          "Any item not in its original condition, is damaged or missing parts for reasons not due to our error.",
          "Any item that is returned more than 30 days after delivery",
        ],
      },
    ],

    addIcon: <AddIcon />,
    expandLess: <ExpandLess />,
    expandMore: <ExpandMore />,
  },
  {
    heading: "HOW WE MAY USE YOUR INFORMATION",
    content: [
      "To facilitate customer service or enable us to contact you if you request information.",
      "To target valuable marketing and advertising offers.",
      " To perform research on our users’ demographics, interests, and behavior based on the information provided to us when making a purchase, during a promotion, from surveys, and our server log files.",
      "To match user information with third-party data to help us better understand our customers (customer profiling).",
      "Share and/or disclose information and/or aggregated user statistics to prospective business partners, advertisers, and other third parties and for other lawful purposes.",
    ],
    addIcon: <AddIcon />,
    expandLess: <ExpandLess />,
    expandMore: <ExpandMore />,
  },
  {
    heading: "REFUND",
    another_modifiedContent: [
      {
        refundRules1: [
          "Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund.",
          "If you are approved, then your refund will be processed, and a credit will automatically be applied to your credit card or original method of payment, within a certain amount of days.",
        ],
        heading1: "Late or missing refunds",
        refundRules2: [
          "If you haven’t received a refund yet, first check your bank account again.",
          "Then contact your credit card company, it may take some time before your refund is officially posted.",
          "Next contact your bank. There is often some processing time before a refund is posted.",
          "If you’ve done all of this and you still have not received your refund yet, please contact us at {email address}.",
        ],
        heading2: "Sale items",
        lastRules:
          "Only regular priced items may be refunded. Sale items cannot be refunded.",
      },
    ],
    addIcon: <AddIcon />,
    expandLess: <ExpandLess />,
    expandMore: <ExpandMore />,
  },
  {
    heading: "HELP",
    content: [
      "Contact us at SUPPORT@APTONSHOPS.COM for questions related to refunds and returns.",
    ],
    addIcon: <AddIcon />,
    expandLess: <ExpandLess />,
    expandMore: <ExpandMore />,
  },
];
