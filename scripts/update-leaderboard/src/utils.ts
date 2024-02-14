import fs from "fs/promises";
import path from "path";

export const findRoot = async () => {
  let currentPath = process.cwd();
  while (true) {
    const packageJsonPath = path.join(currentPath, "package.json");
    try {
      const packageJson = await fs.readFile(packageJsonPath, "utf-8");
      const { name } = JSON.parse(packageJson);
      console.log(name);
      if (name === "web-speed-hackathon") {
        return currentPath;
      }
    } catch (error) {
      // continue searching in parent directory
    }

    const parentPath = path.dirname(currentPath);
    if (parentPath === currentPath) {
      throw new Error("Root directory not found");
    }
    currentPath = parentPath;
  }
};
