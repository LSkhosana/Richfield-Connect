$(document).ready(function () {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        $(".feed").html(`
            <div class="no-user">
                <h2>Please sign up first</h2>
                <p>You need an account to view and create posts.</p>
                <a href="signup.html">
                    <button>Go to Sign Up</button>
                </a>
            </div>
        `);
        return;
    }

    let posts = JSON.parse(localStorage.getItem("posts")) || [];

    showPosts();

    $("#postButton").on("click", function () {
        const content = $("#postContent").val();

        $("#postError").text("");

        if (content === "") {
            $("#postError").text("Post cannot be empty");
            return;
        }

        const post = {
            id: Date.now(),
            username: user.name,
            content: content,
            date: new Date().toLocaleString(),
            likes: 0
        };

        posts.push(post);
        localStorage.setItem("posts", JSON.stringify(posts));

        $("#postContent").val("");

        displayPost(post, true);
    });

    function showPosts() {
        $("#postsContainer").html("");

        posts.forEach(function (post) {
            displayPost(post, false);
        });
    }

    function displayPost(post, fade) {
        const postHtml = $(`
            <div class="post" data-id="${post.id}">
                <p><strong>Name:</strong> ${post.username}</p>
                <p><strong>Date:</strong> ${post.date}</p>
                <p>${post.content}</p>

                <div class="buttons">
                    <button class="likeButton">
                        👍 Like (<span>${post.likes}</span>)
                    </button>
                    <button class="deleteButton">❌ Delete</button>
                </div>
            </div>
        `);

        if (fade) {
            postHtml.hide();
            $("#postsContainer").prepend(postHtml);
            postHtml.fadeIn(600);
        } else {
            $("#postsContainer").prepend(postHtml);
        }
    }

    $(document).on("click", ".likeButton", function () {
        const postId = Number($(this).closest(".post").attr("data-id"));

        posts.forEach(function (post) {
            if (post.id === postId) {
                post.likes++;
            }
        });

        localStorage.setItem("posts", JSON.stringify(posts));
        showPosts();
    });

    $(document).on("click", ".deleteButton", function () {
        const confirmDelete = confirm("Are you sure you want to delete this post?");

        if (confirmDelete) {
            const postId = Number($(this).closest(".post").attr("data-id"));

            posts = posts.filter(function (post) {
                return post.id !== postId;
            });

            localStorage.setItem("posts", JSON.stringify(posts));
            showPosts();
        }
    });
});