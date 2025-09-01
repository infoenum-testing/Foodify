import { db } from "../../FirebaseManager/firebaseConfig";

export const fetchMenu = async () => {
  try {
    const snapshot = await db.ref("menu").once("value");
    if (snapshot.exists()) {
      const rawData = snapshot.val();

      const categories = rawData.map((cat, index) => ({
        id: index + 1,
        name: cat.categoryName,
      }));

      const productsByCategory = {};
      rawData.forEach((cat) => {
        productsByCategory[cat.categoryName] = cat.items || [];
      });

      return { categories, productsByCategory };
    }
    return { categories: [], productsByCategory: {} };
  } catch (error) {
    console.error("Error fetching menu:", error);
    return { categories: [], productsByCategory: {} };
  }
};
