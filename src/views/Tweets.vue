<template>
  <div class="tweets-page">
    <!-- 測試頁面，確認字體有拉到 SCSS 的樣式 -->
    <section class="center-view">
      <ReplyModal
        v-if="isReplyModalShow"
        @after-comment-send="afterCommentSend"
        @after-comment-checkout="afterCommentCheckout"
        :replyTweet="replyTweet"
      />
      <PageNameBanner :banner-title="bannerTitle" />
      <NewTweetForm />
      <NewestFeedList
        v-for="tweet in tweets"
        :key="tweet.id"
        :tweet="tweet"
        @after-add-like="addLikeHandler"
        @after-delete-like="deleteLikeHandler"
        @after-launch-reply-modal="afterLaunchReplyModal"
      />
    </section>
    <section class="right-card">
      <PopularUsersCard />
    </section>
  </div>
</template>

<script>
import PopularUsersCard from "../components/PopularUsersCard.vue";
import PageNameBanner from "../components/PageNameBanner.vue";
import NewTweetForm from "../components/NewTweetForm.vue";
import NewestFeedList from "../components/NewestFeedList.vue";
import ReplyModal from "../components/ReplyModel.vue";

const dummyData = {
  tweets: [
    {
      id: 1,
      UserId: 1,
      description: "vitae molestiae deserunt",
      createdAt: "2021-11-30T10:14:55.000Z",
      updatedAt: "2021-11-30T10:14:55.000Z",
      Replies: [
        {
          id: 7,
          UserId: 8,
          TweetId: 1,
          comment:
            "Similique est labore voluptas sunt molestiae sunt adipisci vero. Vel aut laboriosam explicabo autem sapiente voluptatem eligendi a. Minima v",
          createdAt: "2021-11-30T11:09:34.000Z",
          updatedAt: "2021-11-30T11:09:34.000Z",
        },
        {
          id: 6,
          UserId: 7,
          TweetId: 1,
          comment:
            "Neque pariatur quisquam fugiat dicta itaque minima aut. Sed qui id vitae rem sunt debitis. Odit culpa in necessitatibus impedit quia saepe. ",
          createdAt: "2021-11-30T11:09:34.000Z",
          updatedAt: "2021-11-30T11:09:34.000Z",
        },
        {
          id: 5,
          UserId: 6,
          TweetId: 1,
          comment:
            "Soluta quia inventore. Non voluptate architecto iste sunt recusandae voluptatem. Nihil labore sed explicabo omnis id voluptas sequi commodi ",
          createdAt: "2021-11-30T11:09:34.000Z",
          updatedAt: "2021-11-30T11:09:34.000Z",
        },
        {
          id: 4,
          UserId: 5,
          TweetId: 1,
          comment: "Rerum architecto ut rerum voluptatem.",
          createdAt: "2021-11-30T11:09:34.000Z",
          updatedAt: "2021-11-30T11:09:34.000Z",
        },
        {
          id: 3,
          UserId: 4,
          TweetId: 1,
          comment: "soluta eaque est",
          createdAt: "2021-11-30T11:09:34.000Z",
          updatedAt: "2021-11-30T11:09:34.000Z",
        },
        {
          id: 2,
          UserId: 3,
          TweetId: 1,
          comment: "non assumenda voluptatem",
          createdAt: "2021-11-30T11:09:34.000Z",
          updatedAt: "2021-11-30T11:09:34.000Z",
        },
        {
          id: 1,
          UserId: 2,
          TweetId: 1,
          comment: "Occaecati veritatis omnis.",
          createdAt: "2021-11-30T11:09:34.000Z",
          updatedAt: "2021-11-30T11:09:34.000Z",
        },
      ],
      Likes: [],
      replyCount: 7,
      likeCount: 0,
      // 先自己加的，後端應回傳 (使用者是否按此貼文讚)
      isLike: false,
    },
    {
      id: 2,
      UserId: 1,
      description: "Cum harum earum debitis ut.",
      createdAt: "2021-11-30T10:14:55.000Z",
      updatedAt: "2021-11-30T10:14:55.000Z",
      Replies: [
        {
          id: 14,
          UserId: 5,
          TweetId: 2,
          comment: "Sed accusamus atque autem quo eum delectus.",
          createdAt: "2021-11-30T11:09:34.000Z",
          updatedAt: "2021-11-30T11:09:34.000Z",
        },
        {
          id: 13,
          UserId: 4,
          TweetId: 2,
          comment:
            "Quia nihil omnis magni odit exercitationem laudantium vero.",
          createdAt: "2021-11-30T11:09:34.000Z",
          updatedAt: "2021-11-30T11:09:34.000Z",
        },
        {
          id: 12,
          UserId: 3,
          TweetId: 2,
          comment:
            "Ullam ea at rem est soluta est aut ducimus. Provident vero aut. Magnam occaecati aut. Doloribus maiores ipsam temporibus nobis sequi maxime ",
          createdAt: "2021-11-30T11:09:34.000Z",
          updatedAt: "2021-11-30T11:09:34.000Z",
        },
        {
          id: 11,
          UserId: 2,
          TweetId: 2,
          comment:
            "Vel velit laboriosam qui sed distinctio explicabo provident. Adipisci asperiores molestias porro aliquam ad repellendus. Minima eos sed. Sit",
          createdAt: "2021-11-30T11:09:34.000Z",
          updatedAt: "2021-11-30T11:09:34.000Z",
        },
        {
          id: 10,
          UserId: 1,
          TweetId: 2,
          comment:
            "Placeat eveniet porro.\nHarum autem dolorum nulla iste et et.\nIllo rerum deserunt aut et expedita.",
          createdAt: "2021-11-30T11:09:34.000Z",
          updatedAt: "2021-11-30T11:09:34.000Z",
        },
        {
          id: 9,
          UserId: 10,
          TweetId: 2,
          comment: "deserunt",
          createdAt: "2021-11-30T11:09:34.000Z",
          updatedAt: "2021-11-30T11:09:34.000Z",
        },
        {
          id: 8,
          UserId: 9,
          TweetId: 2,
          comment:
            "Ullam aut qui consequatur optio aperiam. Officia id neque quas.",
          createdAt: "2021-11-30T11:09:34.000Z",
          updatedAt: "2021-11-30T11:09:34.000Z",
        },
      ],
      Likes: [
        {
          id: 181,
          UserId: 10,
          TweetId: 2,
          createdAt: "2021-11-30T13:02:43.000Z",
          updatedAt: "2021-11-30T13:02:43.000Z",
        },
        {
          id: 81,
          UserId: 5,
          TweetId: 2,
          createdAt: "2021-11-30T13:02:43.000Z",
          updatedAt: "2021-11-30T13:02:43.000Z",
        },
        {
          id: 21,
          UserId: 2,
          TweetId: 2,
          createdAt: "2021-11-30T13:02:43.000Z",
          updatedAt: "2021-11-30T13:02:43.000Z",
        },
      ],
      replyCount: 7,
      likeCount: 3,
    },
    {
      id: 3,
      UserId: 1,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores distinctio quia officia? Sit unde illo harum! Necessitatibus iusto sunt odit error hic expedita et iste? Est perspiciatis iste consectetur harum.",
      createdAt: "2021-11-30T10:14:55.000Z",
      updatedAt: "2021-11-30T10:14:55.000Z",
      Replies: [
        {
          id: 21,
          UserId: 2,
          TweetId: 3,
          comment: "Quisquam eius quos ut voluptate et sunt repellendus.",
          createdAt: "2021-11-30T11:09:34.000Z",
          updatedAt: "2021-11-30T11:09:34.000Z",
        },
        {
          id: 20,
          UserId: 1,
          TweetId: 3,
          comment:
            "Sed est modi velit repudiandae totam aspernatur repellat quia.",
          createdAt: "2021-11-30T11:09:34.000Z",
          updatedAt: "2021-11-30T11:09:34.000Z",
        },
        {
          id: 19,
          UserId: 10,
          TweetId: 3,
          comment:
            "Ut sunt incidunt. Repellendus ut a sit ea quam dolore velit accusamus quod. Soluta harum nisi quas sint esse placeat. Asperiores perferendis",
          createdAt: "2021-11-30T11:09:34.000Z",
          updatedAt: "2021-11-30T11:09:34.000Z",
        },
        {
          id: 18,
          UserId: 9,
          TweetId: 3,
          comment: "Quo nostrum atque ad aut.",
          createdAt: "2021-11-30T11:09:34.000Z",
          updatedAt: "2021-11-30T11:09:34.000Z",
        },
        {
          id: 17,
          UserId: 8,
          TweetId: 3,
          comment:
            "Inventore doloribus repellat perspiciatis deleniti recusandae dolor aut iure est.\nMinima ut enim error ea voluptatibus.",
          createdAt: "2021-11-30T11:09:34.000Z",
          updatedAt: "2021-11-30T11:09:34.000Z",
        },
        {
          id: 16,
          UserId: 7,
          TweetId: 3,
          comment: "voluptatem eum quasi",
          createdAt: "2021-11-30T11:09:34.000Z",
          updatedAt: "2021-11-30T11:09:34.000Z",
        },
        {
          id: 15,
          UserId: 6,
          TweetId: 3,
          comment: "Magni debitis sed quo rerum omnis aut eligendi.",
          createdAt: "2021-11-30T11:09:34.000Z",
          updatedAt: "2021-11-30T11:09:34.000Z",
        },
      ],
      Likes: [
        {
          id: 141,
          UserId: 8,
          TweetId: 3,
          createdAt: "2021-11-30T13:02:43.000Z",
          updatedAt: "2021-11-30T13:02:43.000Z",
        },
        {
          id: 101,
          UserId: 6,
          TweetId: 3,
          createdAt: "2021-11-30T13:02:43.000Z",
          updatedAt: "2021-11-30T13:02:43.000Z",
        },
        {
          id: 41,
          UserId: 3,
          TweetId: 3,
          createdAt: "2021-11-30T13:02:43.000Z",
          updatedAt: "2021-11-30T13:02:43.000Z",
        },
        {
          id: 1,
          UserId: 1,
          TweetId: 3,
          createdAt: "2021-11-30T13:02:43.000Z",
          updatedAt: "2021-11-30T13:02:43.000Z",
        },
      ],
      replyCount: 7,
      likeCount: 4,
      // 先自己加的，後端應回傳 (使用者是否按此貼文讚)
      isLike: true,
    },
    {
      id: 4,
      UserId: 1,
      description: "quis non harum",
      createdAt: "2021-11-30T10:14:55.000Z",
      updatedAt: "2021-11-30T10:14:55.000Z",
      Replies: [
        {
          id: 28,
          UserId: 9,
          TweetId: 4,
          comment:
            "Fugit dicta quod et voluptate blanditiis in et. Nihil quia velit dolorem accusamus. Et eligendi pariatur eos dolor quidem nihil. Adipisci oc",
          createdAt: "2021-11-30T11:09:34.000Z",
          updatedAt: "2021-11-30T11:09:34.000Z",
        },
        {
          id: 27,
          UserId: 8,
          TweetId: 4,
          comment:
            "Similique eum ullam est vel voluptatem. Earum deserunt fuga. Et fuga ipsam sit soluta vitae aut laborum quaerat. Aspernatur nam voluptates. ",
          createdAt: "2021-11-30T11:09:34.000Z",
          updatedAt: "2021-11-30T11:09:34.000Z",
        },
        {
          id: 26,
          UserId: 7,
          TweetId: 4,
          comment: "quo",
          createdAt: "2021-11-30T11:09:34.000Z",
          updatedAt: "2021-11-30T11:09:34.000Z",
        },
        {
          id: 25,
          UserId: 6,
          TweetId: 4,
          comment:
            "Molestiae ut cupiditate rerum quaerat molestias voluptatum.",
          createdAt: "2021-11-30T11:09:34.000Z",
          updatedAt: "2021-11-30T11:09:34.000Z",
        },
        {
          id: 24,
          UserId: 5,
          TweetId: 4,
          comment:
            "Earum illum nulla veritatis laudantium dignissimos architecto culpa nesciunt. Consectetur magni deserunt maiores nihil qui quas reiciendis n",
          createdAt: "2021-11-30T11:09:34.000Z",
          updatedAt: "2021-11-30T11:09:34.000Z",
        },
        {
          id: 23,
          UserId: 4,
          TweetId: 4,
          comment: "fuga quo id",
          createdAt: "2021-11-30T11:09:34.000Z",
          updatedAt: "2021-11-30T11:09:34.000Z",
        },
        {
          id: 22,
          UserId: 3,
          TweetId: 4,
          comment:
            "Aperiam ipsum deserunt molestias iure aliquid. Non mollitia veniam autem dolores eligendi illo qui. Consectetur nihil quia consequuntur eos ",
          createdAt: "2021-11-30T11:09:34.000Z",
          updatedAt: "2021-11-30T11:09:34.000Z",
        },
      ],
      Likes: [
        {
          id: 161,
          UserId: 9,
          TweetId: 4,
          createdAt: "2021-11-30T13:02:43.000Z",
          updatedAt: "2021-11-30T13:02:43.000Z",
        },
        {
          id: 121,
          UserId: 7,
          TweetId: 4,
          createdAt: "2021-11-30T13:02:43.000Z",
          updatedAt: "2021-11-30T13:02:43.000Z",
        },
      ],
      replyCount: 7,
      likeCount: 2,
      // 先自己加的，後端應回傳 (使用者是否按此貼文讚)
      isLike: false,
    },
    {
      id: 5,
      UserId: 1,
      description:
        "Maiores minus est saepe.\nQuo quam animi eaque qui.\nError laboriosam laudantium.",
      createdAt: "2021-11-30T10:14:55.000Z",
      updatedAt: "2021-11-30T10:14:55.000Z",
      Replies: [
        {
          id: 35,
          UserId: 6,
          TweetId: 5,
          comment:
            "Ipsum esse autem qui. Eligendi dolore tenetur. Sed voluptas cumque iusto. Incidunt sunt quia labore est odio inventore.",
          createdAt: "2021-11-30T11:09:34.000Z",
          updatedAt: "2021-11-30T11:09:34.000Z",
        },
        {
          id: 34,
          UserId: 5,
          TweetId: 5,
          comment: "Quaerat perspiciatis et sed.",
          createdAt: "2021-11-30T11:09:34.000Z",
          updatedAt: "2021-11-30T11:09:34.000Z",
        },
        {
          id: 33,
          UserId: 4,
          TweetId: 5,
          comment: "dolorum",
          createdAt: "2021-11-30T11:09:34.000Z",
          updatedAt: "2021-11-30T11:09:34.000Z",
        },
        {
          id: 32,
          UserId: 3,
          TweetId: 5,
          comment:
            "Veniam autem maxime esse natus necessitatibus consequuntur qui enim.\nVoluptatem non natus.",
          createdAt: "2021-11-30T11:09:34.000Z",
          updatedAt: "2021-11-30T11:09:34.000Z",
        },
        {
          id: 31,
          UserId: 2,
          TweetId: 5,
          comment: "Esse qui qui omnis nihil soluta veniam.",
          createdAt: "2021-11-30T11:09:34.000Z",
          updatedAt: "2021-11-30T11:09:34.000Z",
        },
        {
          id: 30,
          UserId: 1,
          TweetId: 5,
          comment: "a vel libero",
          createdAt: "2021-11-30T11:09:34.000Z",
          updatedAt: "2021-11-30T11:09:34.000Z",
        },
        {
          id: 29,
          UserId: 10,
          TweetId: 5,
          comment:
            "Fuga sapiente illo blanditiis. Autem est voluptas ut vitae velit voluptatem. Quia accusantium aut.\n \rIste ipsam occaecati. Veniam porro quid",
          createdAt: "2021-11-30T11:09:34.000Z",
          updatedAt: "2021-11-30T11:09:34.000Z",
        },
      ],
      Likes: [
        {
          id: 61,
          UserId: 4,
          TweetId: 5,
          createdAt: "2021-11-30T13:02:43.000Z",
          updatedAt: "2021-11-30T13:02:43.000Z",
        },
      ],
      replyCount: 7,
      likeCount: 1,
      // 先自己加的，後端應回傳 (使用者是否按此貼文讚)
      isLike: false,
    },
    {
      id: 6,
      UserId: 1,
      description: "illo est deleniti",
      createdAt: "2021-11-30T10:14:55.000Z",
      updatedAt: "2021-11-30T10:14:55.000Z",
      Replies: [
        {
          id: 42,
          UserId: 3,
          TweetId: 6,
          comment:
            "Aut enim molestiae et. Voluptatibus beatae ullam quis placeat explicabo tempora ipsa. Consequatur non molestiae sit. Deleniti qui aut corrup",
          createdAt: "2021-11-30T11:09:34.000Z",
          updatedAt: "2021-11-30T11:09:34.000Z",
        },
        {
          id: 41,
          UserId: 2,
          TweetId: 6,
          comment:
            "Et veritatis ex recusandae voluptatem doloribus. Sunt sunt animi eveniet sit optio accusamus ut voluptas. Soluta id vitae autem placeat repe",
          createdAt: "2021-11-30T11:09:34.000Z",
          updatedAt: "2021-11-30T11:09:34.000Z",
        },
        {
          id: 40,
          UserId: 1,
          TweetId: 6,
          comment: "eos",
          createdAt: "2021-11-30T11:09:34.000Z",
          updatedAt: "2021-11-30T11:09:34.000Z",
        },
        {
          id: 39,
          UserId: 10,
          TweetId: 6,
          comment:
            "Earum neque cupiditate consectetur consequatur sequi quia qui. A consequatur repellendus. Dolor laborum molestiae sunt at. Enim velit qui ul",
          createdAt: "2021-11-30T11:09:34.000Z",
          updatedAt: "2021-11-30T11:09:34.000Z",
        },
        {
          id: 38,
          UserId: 9,
          TweetId: 6,
          comment:
            "Eos et labore non.\nAsperiores asperiores eaque consequatur aut et qui.\nCupiditate consequatur vel aperiam assumenda.\nIn ut id quibusdam ad v",
          createdAt: "2021-11-30T11:09:34.000Z",
          updatedAt: "2021-11-30T11:09:34.000Z",
        },
        {
          id: 37,
          UserId: 8,
          TweetId: 6,
          comment: "eaque assumenda assumenda",
          createdAt: "2021-11-30T11:09:34.000Z",
          updatedAt: "2021-11-30T11:09:34.000Z",
        },
        {
          id: 36,
          UserId: 7,
          TweetId: 6,
          comment:
            "Quis deserunt aut repudiandae aperiam aut ducimus debitis ex veniam.\nAsperiores occaecati inventore.\nDolor non magnam laudantium dolores lab",
          createdAt: "2021-11-30T11:09:34.000Z",
          updatedAt: "2021-11-30T11:09:34.000Z",
        },
      ],
      Likes: [
        {
          id: 142,
          UserId: 8,
          TweetId: 6,
          createdAt: "2021-11-30T13:02:43.000Z",
          updatedAt: "2021-11-30T13:02:43.000Z",
        },
        {
          id: 122,
          UserId: 7,
          TweetId: 6,
          createdAt: "2021-11-30T13:02:43.000Z",
          updatedAt: "2021-11-30T13:02:43.000Z",
        },
        {
          id: 42,
          UserId: 3,
          TweetId: 6,
          createdAt: "2021-11-30T13:02:43.000Z",
          updatedAt: "2021-11-30T13:02:43.000Z",
        },
        {
          id: 22,
          UserId: 2,
          TweetId: 6,
          createdAt: "2021-11-30T13:02:43.000Z",
          updatedAt: "2021-11-30T13:02:43.000Z",
        },
      ],
      replyCount: 7,
      likeCount: 4,
      // 先自己加的，後端應回傳 (使用者是否按此貼文讚)
      isLike: false,
    },
    {
      id: 7,
      UserId: 1,
      description:
        "Fuga sed dolorem id at dolores non.\nIncidunt ab aut optio est.\nConsequuntur possimus vero aut sunt et ipsa consequatur illum.\nIpsam inventor",
      createdAt: "2021-11-30T10:14:55.000Z",
      updatedAt: "2021-11-30T10:14:55.000Z",
      Replies: [
        {
          id: 49,
          UserId: 10,
          TweetId: 7,
          comment: "Esse et non aut nihil corporis.",
          createdAt: "2021-11-30T11:09:34.000Z",
          updatedAt: "2021-11-30T11:09:34.000Z",
        },
        {
          id: 48,
          UserId: 9,
          TweetId: 7,
          comment:
            "Est aut est. Qui odio omnis quia possimus impedit tempora natus. Incidunt harum non voluptas aut voluptatibus. Ut provident et voluptatibus ",
          createdAt: "2021-11-30T11:09:34.000Z",
          updatedAt: "2021-11-30T11:09:34.000Z",
        },
        {
          id: 47,
          UserId: 8,
          TweetId: 7,
          comment: "Quasi corrupti sunt omnis tempore non labore repellat.",
          createdAt: "2021-11-30T11:09:34.000Z",
          updatedAt: "2021-11-30T11:09:34.000Z",
        },
        {
          id: 46,
          UserId: 7,
          TweetId: 7,
          comment: "Nesciunt nulla qui vitae.",
          createdAt: "2021-11-30T11:09:34.000Z",
          updatedAt: "2021-11-30T11:09:34.000Z",
        },
        {
          id: 45,
          UserId: 6,
          TweetId: 7,
          comment:
            "Error eaque doloremque. Et necessitatibus vitae debitis. Sequi perferendis blanditiis eveniet. Illo pariatur numquam. Perferendis sint solut",
          createdAt: "2021-11-30T11:09:34.000Z",
          updatedAt: "2021-11-30T11:09:34.000Z",
        },
        {
          id: 44,
          UserId: 5,
          TweetId: 7,
          comment: "at aut amet",
          createdAt: "2021-11-30T11:09:34.000Z",
          updatedAt: "2021-11-30T11:09:34.000Z",
        },
        {
          id: 43,
          UserId: 4,
          TweetId: 7,
          comment:
            "Architecto dolore esse dicta recusandae suscipit itaque ut. Quia libero porro neque totam delectus explicabo. A sapiente sequi voluptas ea f",
          createdAt: "2021-11-30T11:09:34.000Z",
          updatedAt: "2021-11-30T11:09:34.000Z",
        },
      ],
      Likes: [
        {
          id: 62,
          UserId: 4,
          TweetId: 7,
          createdAt: "2021-11-30T13:02:43.000Z",
          updatedAt: "2021-11-30T13:02:43.000Z",
        },
      ],
      replyCount: 7,
      likeCount: 1,
      // 先自己加的，後端應回傳 (使用者是否按此貼文讚)
      isLike: false,
    },
    {
      id: 8,
      UserId: 1,
      description: "Ut labore cupiditate repudiandae quisquam aut nam eos et.",
      createdAt: "2021-11-30T10:14:55.000Z",
      updatedAt: "2021-11-30T10:14:55.000Z",
      Replies: [
        {
          id: 56,
          UserId: 7,
          TweetId: 8,
          comment: "Ut impedit odit odit explicabo et est mollitia.",
          createdAt: "2021-11-30T11:09:34.000Z",
          updatedAt: "2021-11-30T11:09:34.000Z",
        },
        {
          id: 55,
          UserId: 6,
          TweetId: 8,
          comment:
            "Consectetur rerum quas corporis quia in sit occaecati. Rerum itaque reiciendis quis tenetur omnis sed. Quasi sit odio qui nihil. Aspernatur ",
          createdAt: "2021-11-30T11:09:34.000Z",
          updatedAt: "2021-11-30T11:09:34.000Z",
        },
        {
          id: 54,
          UserId: 5,
          TweetId: 8,
          comment: "suscipit ut qui",
          createdAt: "2021-11-30T11:09:34.000Z",
          updatedAt: "2021-11-30T11:09:34.000Z",
        },
        {
          id: 53,
          UserId: 4,
          TweetId: 8,
          comment: "quae nihil deleniti",
          createdAt: "2021-11-30T11:09:34.000Z",
          updatedAt: "2021-11-30T11:09:34.000Z",
        },
        {
          id: 52,
          UserId: 3,
          TweetId: 8,
          comment:
            "Provident accusamus rerum nobis sed voluptas est atque.\nSit quam possimus consequatur eligendi.\nRepellendus pariatur voluptatem magni debiti",
          createdAt: "2021-11-30T11:09:34.000Z",
          updatedAt: "2021-11-30T11:09:34.000Z",
        },
        {
          id: 51,
          UserId: 2,
          TweetId: 8,
          comment:
            "Esse enim reprehenderit.\nFacere quam culpa aut quam earum consequuntur culpa atque.\nVero quas porro et sunt similique sed.\nDignissimos non r",
          createdAt: "2021-11-30T11:09:34.000Z",
          updatedAt: "2021-11-30T11:09:34.000Z",
        },
        {
          id: 50,
          UserId: 1,
          TweetId: 8,
          comment:
            "Nemo tempora voluptas possimus consequuntur consequatur deserunt cum. Officiis ut nam placeat. Facilis est voluptatem quia. Aut et ea. Ipsam",
          createdAt: "2021-11-30T11:09:34.000Z",
          updatedAt: "2021-11-30T11:09:34.000Z",
        },
      ],
      Likes: [
        {
          id: 162,
          UserId: 9,
          TweetId: 8,
          createdAt: "2021-11-30T13:02:43.000Z",
          updatedAt: "2021-11-30T13:02:43.000Z",
        },
        {
          id: 82,
          UserId: 5,
          TweetId: 8,
          createdAt: "2021-11-30T13:02:43.000Z",
          updatedAt: "2021-11-30T13:02:43.000Z",
        },
        {
          id: 2,
          UserId: 1,
          TweetId: 8,
          createdAt: "2021-11-30T13:02:43.000Z",
          updatedAt: "2021-11-30T13:02:43.000Z",
        },
      ],
      replyCount: 7,
      likeCount: 3,
      // 先自己加的，後端應回傳 (使用者是否按此貼文讚)
      isLike: true,
    },
    {
      id: 9,
      UserId: 1,
      description:
        "Laboriosam aut fugit eaque molestiae aspernatur velit fugit laudantium.",
      createdAt: "2021-11-30T10:14:55.000Z",
      updatedAt: "2021-11-30T10:14:55.000Z",
      Replies: [
        {
          id: 63,
          UserId: 4,
          TweetId: 9,
          comment: "Optio eum hic quod ea iste.",
          createdAt: "2021-11-30T11:09:34.000Z",
          updatedAt: "2021-11-30T11:09:34.000Z",
        },
        {
          id: 62,
          UserId: 3,
          TweetId: 9,
          comment:
            "Atque dignissimos et iste quo illum in. Pariatur voluptas qui et adipisci similique. Expedita reiciendis labore earum voluptas asperiores. P",
          createdAt: "2021-11-30T11:09:34.000Z",
          updatedAt: "2021-11-30T11:09:34.000Z",
        },
        {
          id: 61,
          UserId: 2,
          TweetId: 9,
          comment: "Saepe magni esse.",
          createdAt: "2021-11-30T11:09:34.000Z",
          updatedAt: "2021-11-30T11:09:34.000Z",
        },
        {
          id: 60,
          UserId: 1,
          TweetId: 9,
          comment:
            "Omnis nam aut. Temporibus nihil beatae quia praesentium. Aliquid maxime error aut et ea ad error tempora fuga. Consequuntur aliquid explicab",
          createdAt: "2021-11-30T11:09:34.000Z",
          updatedAt: "2021-11-30T11:09:34.000Z",
        },
        {
          id: 59,
          UserId: 10,
          TweetId: 9,
          comment:
            "Quia est sed quia blanditiis.\nModi corrupti totam repudiandae et et.\nVel voluptatem et occaecati minus consequuntur earum consequuntur totam",
          createdAt: "2021-11-30T11:09:34.000Z",
          updatedAt: "2021-11-30T11:09:34.000Z",
        },
        {
          id: 58,
          UserId: 9,
          TweetId: 9,
          comment:
            "Iste autem iste rerum rerum deserunt consequatur.\nVelit exercitationem inventore est.\nEnim ratione ut molestias.\nDignissimos quia quos amet.",
          createdAt: "2021-11-30T11:09:34.000Z",
          updatedAt: "2021-11-30T11:09:34.000Z",
        },
        {
          id: 57,
          UserId: 8,
          TweetId: 9,
          comment: "Sit cum autem ratione dolorem et ut.",
          createdAt: "2021-11-30T11:09:34.000Z",
          updatedAt: "2021-11-30T11:09:34.000Z",
        },
      ],
      Likes: [
        {
          id: 182,
          UserId: 10,
          TweetId: 9,
          createdAt: "2021-11-30T13:02:43.000Z",
          updatedAt: "2021-11-30T13:02:43.000Z",
        },
        {
          id: 102,
          UserId: 6,
          TweetId: 9,
          createdAt: "2021-11-30T13:02:43.000Z",
          updatedAt: "2021-11-30T13:02:43.000Z",
        },
      ],
      replyCount: 7,
      likeCount: 2,
      // 先自己加的，後端應回傳 (使用者是否按此貼文讚)
      isLike: false,
    },
  ],
};

export default {
  components: {
    PopularUsersCard,
    PageNameBanner,
    NewTweetForm,
    NewestFeedList,
    ReplyModal,
  },
  data() {
    return {
      bannerTitle: "首頁",
      tweets: [],
      // reply modal
      isReplyModalShow: false,
      replyTweet: {},
    };
  },
  created() {
    this.fetchTweetsData();
  },
  methods: {
    fetchTweetsData() {
      this.tweets = dummyData.tweets;
    },
    addLikeHandler(tweetId) {
      console.log("emit", tweetId);
      this.tweets = this.tweets.map((tweet) => {
        if (tweet.id !== tweetId) {
          return tweet;
        } else {
          return {
            ...tweet,
            likeCount: tweet.likeCount + 1,
            isLike: true,
          };
        }
      });
    },
    deleteLikeHandler(tweetId) {
      console.log("emit", tweetId);
      this.tweets = this.tweets.map((tweet) => {
        if (tweet.id !== tweetId) {
          return tweet;
        } else {
          return {
            ...tweet,
            likeCount: tweet.likeCount - 1,
            isLike: false,
          };
        }
      });
    },
    // reply Modal 控制區
    afterLaunchReplyModal(tweetId) {
      console.log(tweetId);
      this.replyTweet = this.tweets.find((tweet) => tweet.id == tweetId);
      console.log(this.replyTweet);
      this.isReplyModalShow = true;
    },
    afterCommentSend(comment) {
      console.log("回覆內容送出：123", comment);
    },
    afterCommentCheckout() {
      this.isReplyModalShow = false;
    },
  },
};
</script>
