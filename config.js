const MINE_RATE = 60000;
const INITIAL_DIFFICULTY = 3; 

const GENESIS_DATA = {
    timestamp: '05/05/2021, 1:53:20 PM',
    lastHash: '-----',
    hash: 'hash-one',
    data: '',
    difficulty: INITIAL_DIFFICULTY
};

const STARTING_BALANCE = 1000;

const REWARD_INPUT = {
    address:'*authorized-reward*'
};

const MINING_REWARD = 50;

module.exports = {
    GENESIS_DATA,
    MINE_RATE,
    STARTING_BALANCE,
    REWARD_INPUT, 
    MINING_REWARD
};