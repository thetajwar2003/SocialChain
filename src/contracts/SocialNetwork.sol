pragma solidity ^0.5.0;

contract SocialNetwork {
    string public name;
    uint256 public postCount = 0;

    mapping(uint256 => Post) public posts;

    struct Post {
        uint256 id;
        string content;
        uint256 tipAmount;
        address payable author;
    }

    event PostCreated(
        uint256 id,
        string content,
        uint256 tipAmount,
        address payable author
    );

    event PostTipped(
        uint256 id,
        string content,
        uint256 tipAmount,
        address payable author
    );

    constructor() public {
        name = "My Social Network";
    }

    function createPost(string memory _content) public {
        // require valid content
        require(bytes(_content).length > 0);

        // increment the post count
        postCount++;

        // create the post
        posts[postCount] = Post(postCount, _content, 0, msg.sender);

        // trigger event
        emit PostCreated(postCount, _content, 0, msg.sender);
    }

    function tipPost(uint256 _id) public payable {
        // make sure if is valid
        require(_id > 0 && _id <= postCount);

        // fetch post
        Post memory _post = posts[_id];

        // fetch author
        address payable _author = _post.author;

        // pay the author by sending them ether
        address(_author).transfer(msg.value);

        // increment the tip amount
        _post.tipAmount = _post.tipAmount + msg.value;

        // update the post
        posts[_id] = _post;

        // trigger an event
        emit PostTipped(postCount, _post.content, _post.tipAmount, _author);
    }
}
