pragma solidity ^0.5.0;

contract TodoList {
  uint public taskCount = 0;

  struct Task {
    uint id;
    string encryptedHash;
    string homeBank;
    string profileName;
  }

  mapping(uint => Task) public tasks;

  event TaskCreated(
    uint id,
    string encryptedHash,
    string homeBank,
    string profileName
  );

  function createTask(string memory _encryptedHash, string memory _homeBank, string memory _profileName) public {
    taskCount ++;
    tasks[taskCount] = Task(taskCount, _encryptedHash, _homeBank, _profileName);
    emit TaskCreated(taskCount, _encryptedHash, _homeBank, _profileName);
  }

}
