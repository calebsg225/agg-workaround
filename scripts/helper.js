class Helper {
  appendElements = (elements, destination) => {
    for (const element of elements) {
      destination.append(element);
    }
  }
}

export default new Helper;