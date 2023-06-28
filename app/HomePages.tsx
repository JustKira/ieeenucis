import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const Main = () => {
  return (
    <div className="flex flex-col py-12 space-y-4">
      <h1 className="text-5xl font-bold">WHO WE ARE</h1>
      <p className="font-light leading-relaxed">
        IEEENU CIS is a student chapter that was founded near the end of 2021 as
        the second student chapter from the IEEENU Student Branch. It was a club
        founded on the premise of spreading knowledge and awareness about
        computational intelligence. Computational intelligence covers a lot of
        fields under its umbrella. With topics ranging from fuzzy logic to
        genetic algorithms to evolutionary programming to machine learning and
        deep learning, computational intelligence is a vast category of science
        that can be summarized under the title of “creating systems that allow
        computers to think intelligently and make smart decisions” In IEEENU
        CIS, we focus on preparing university undergraduates to be prepared for
        the job market. Let’s walk through that process.
        <span className="font-medium text-blue-500">
          The job market for AI requires skills that can be categorized into 3
          types
        </span>
      </p>
      <ul className="flex flex-col ml-4 space-y-2 font-medium list-decimal">
        <li>Dealing with Data</li>
        <li>Knowledge of the Practice</li>
        <li>Data Visualization</li>
      </ul>
      <Separator />
      <div className="flex flex-col space-y-4">
        <Card className="flex flex-col p-4 space-y-2">
          <h1 className="text-xl font-semibold">Dealing with Data:</h1>
          <p className="font-light leading-relaxed">
            job candidate should be able to handle the input, retrieval,
            cleaning, and wrangling of data into a usable format for the next
            stage of modeling. i.e. SQL, data engineering, data exploration,
            etc.
          </p>
        </Card>
        <Card className="flex flex-col p-4 space-y-2">
          <h1 className="text-xl font-semibold">Knowledge of the Practice:</h1>
          <p className="font-light leading-relaxed">
            job candidate should be able to create, formulate, and tune systems
            involving computational intelligence i.e. ML and DL models, fuzzy
            logic controllers, expert systems, etc
          </p>
        </Card>
        <Card className="flex flex-col p-4 space-y-2">
          <h1 className="text-xl font-semibold">Data Visualization:</h1>
          <p className="font-light leading-relaxed">
            job candidate should be able to properly visualize and communicate
            his findings and results to non-technical stakeholders.
          </p>
        </Card>
      </div>
      <Separator />
      <p className="font-light leading-relaxed">
        Members of the club are exposed to activities that aim to improve one or
        more of these aspects. In the beginning, members are exposed to a
        training period of 4-5 weeks which aims to teach them about the basic
        building blocks of machine learning and deep learning as well as get
        them familiar to basic coding. The courses used as studying material are
        handpicked from trusted sources like Udacity and also from prestigious
        universities and by talented instructors to provide the most up to date
        and strong theoretical knowledge that members will need in practice.
        <span className="mx-1 font-medium underline">
          New members are also assisted by senior members (who are labeled
          trainers) to better the learning experience.
        </span>
        The training cycle includes video material, text material, quizzes,
        coding questions and mentoring. Once the training cycle ends, members
        enter the competition cycle where they gain access to 3 distinct weekly
        activities:
      </p>
      <Card className="flex flex-col p-4 space-y-2">
        <p className="font-medium leading-relaxed">
          Members enter the competition cycle where they gain access to 3
          distinct weekly activities:
        </p>
        <ul className="flex flex-col ml-4 space-y-2 font-light list-decimal">
          <li>Kaggle Competitions</li>
          <li>Variety Tournaments</li>
          <li>Problem Solving</li>
        </ul>
      </Card>

      <Card className="flex flex-col p-4 space-y-2">
        <p className="font-medium leading-relaxed">
          And they also gain access to committees after 2 or 3 weeks in the
          competition cycle. The available committees are:
        </p>
        <ul className="flex flex-col ml-4 space-y-2 font-light list-decimal">
          <li>Trainers</li>
          <li>Kagglers</li>
          <li>Variety</li> <li>Opportunities</li> <li>Content Creation</li>{" "}
          <li>Problem Solving</li>
        </ul>
      </Card>
    </div>
  );
};

export const ClubActivites = () => {
  return (
    <div className="flex flex-col py-12 space-y-4">
      <h1 className="text-5xl font-bold">Club Activities</h1>
      <p className="font-light leading-relaxed">
        As a general rule in the club, during every week, every member has the
        full freedom to choose whichever activities he/she would like to
        participate in. This allows full flexibility for members to be able to
        maintain consistency of general participation in club activities rather
        than getting burned out. This allows them to be able to pick and choose
        the activities for the week that best suit their time schedule.
      </p>
      <p className="font-light leading-relaxed">
        However, each activity in the club adds points to the participating
        member's score. These points are then what represent this member's{" "}
        <strong>activity/contribution</strong> to the club, and these points are
        what decide who gets the end-of-year rewards and who gets priority in
        general for different opportunities/jobs that the club can recommend
        for.
      </p>

      <Card className="flex flex-col p-4 space-y-2">
        <h1 className="text-xl font-semibold">Kaggle Competitions</h1>
        <p className="font-light leading-relaxed">
          Kaggle Competitions are the bread and butter of the club's practice.
          Each week, a new dataset is presented to members as they compete
          against each other to gain the highest score on the leaderboard. After
          the competition, members are given a score based on their overall
          score (accuracy, MSE, MAE, F Score, etc.) compared to others, their
          data exploration, the readability of their work, and the inference
          time of their models.
        </p>
        <p className="font-light leading-relaxed">
          This particular activity boosts members' ability to{" "}
          <strong>deal with different types of data</strong>, as members are
          asked to explore their targeted data and learn how to deal with
          different data types ranging from images and audio to video and
          language. It is our main promoter for{" "}
          <strong>learning the practice</strong> as members put their learned
          concepts to work and attempt to implement the latest models and
          technologies to get the highest scores. It also boosts{" "}
          <strong>data visualization skills</strong> as members need to properly
          organize their work and present it in an acceptable manner and
          properly visualize their data and modeling.
        </p>
        <p className="font-light leading-relaxed">
          This activity starts as individuals, but as members get more adept and
          familiar with the system, they are organized into teams for a
          multitude of reasons:
        </p>
        <ul className="flex flex-col ml-4 space-y-2 font-light list-disc">
          <li>Provide better results overall as a team</li>
          <li>
            Teach teamwork, leadership, and build trust between team members
          </li>
          <li>
            Prepare members for the usual formats of hackathons which is
            team-based
          </li>
        </ul>
      </Card>
      <Card className="flex flex-col p-4 space-y-2">
        <h1 className="text-xl font-semibold">Variety Tournaments</h1>
        <p className="font-light leading-relaxed">
          In the weekend of every week, we host a variety event. Variety events
          include any coding activity/game that is not our usual kaggle
          competition. These activities promote adaptability, problem-solving,
          and competitiveness. There is not one particular activity but for the
          sake of example, Battlesnake is explained here:
        </p>
        <p className="font-light leading-relaxed">
          Battlesnake tournaments are tournaments conducted on the online
          battlesnake platform as members attempt to build the "smartest" snake
          to win it all. Snakes are basically web servers that act as
          controllers to snakes in the game. This activity promotes a lot of
          creativity as players can use whatever approach they think of to make
          their snake act more intelligently and dodge more pitfalls. Anything
          from pathfinding to mapping algorithms to ML or even reinforcement
          learning or RL is fair game, and it makes for some very intense games
          of the once very simple game of snake. This activity promotes{" "}
          <strong>dealing with data</strong> as members have to deal with an
          environment-based problem instead of a dataset-based one. They learn
          how to receive inputs and process them to make logical decisions; in
          addition, every solution approach may involve certain transformations
          to the data which members learn along their journey through the
          leaderboards. It also promotes{" "}
          <strong>knowledge of the practice</strong> as members learn different
          approaches people have come up with in the past and also make up their
          own flavors of approaches to solve this deceivingly simple game.
        </p>
      </Card>

      <Card className="flex flex-col p-4 space-y-2">
        <h1 className="text-xl font-semibold">Problem Solving</h1>
        <p className="font-light leading-relaxed">
          During every week, a codeforces problem sheet is prepared by our
          Problem Solving Committee and made available to our members. This is
          not a problem-solving club, so this sheet is not meant to teach
          members the full spectrum of problem-solving questions but rather get
          them familiar with questions that are most likely to be asked in job
          interviews. We have handpicked the topics that show up in interviews
          the most, and we even add a bit of flavor to the questions by trying,
          as much as we can, to make them related to AI engineering problems.
        </p>
        <p className="font-light leading-relaxed">
          The sheet has ramping difficulty so as to pose a challenge for some
          members and be a fun weekly puzzle for others who just want to get
          familiar with problem-solving basics.
        </p>
      </Card>
    </div>
  );
};

export const ClubCommittess = () => {
  return (
    <div className="flex flex-col py-12 space-y-4">
      <h1 className="text-5xl font-bold">Club Committees</h1>
      <>
        <Card className="flex flex-col p-4 space-y-2">
          <p className="font-light leading-relaxed">
            After a 2-3 weeks of the competition cycle, members can enter one of
            6 committees to help give back to the club and keep the wheel
            running. These committees are the Trainers, Kagglers, Variety,
            Opportunities, Content Creation, and the Problem Solving committees.
            From their names, most of these committees aim to give senior
            members the chance to help newer members go through the process they
            did and, in doing so, improve the system and the learning
            environment.
          </p>
        </Card>{" "}
        <Card className="flex flex-col p-4 space-y-2">
          <p className="font-light leading-relaxed">
            Trainers are responsible for the main training period in the
            beginning and also for supervising any course content instructed in
            the club. After that, in the competition cycle, Kagglers and Variety
            are responsible for helping new members find their way through the
            beginner Kaggle competitions and Variety tournaments by providing
            tips, tricks, and roadmaps of ideas for members to explore. This
            helps make every new batch better than the last and further supports
            the growth of the club. Opportunities mainly focus on finding online
            opportunities for club members, ranging from courses to bootcamp
            opportunities, Kaggle competitions of interest, Variety events,
            hackathon opportunities, or even just project ideas that members can
            work on. Content Creation includes members who are interested in
            helping develop and maintain the website, as well as in editing and
            preparing video content recorded by our members. Finally, the
            Problem Solving committee is responsible for preparing the weekly
            problem sheets mentioned previously and also contributes to the
            Problem Solving for AI playlist.
          </p>
        </Card>{" "}
        <Card className="flex flex-col p-4 space-y-2">
          <p className="font-light leading-relaxed">
            Through this journey, in addition to the main 3 job-related goals we
            envision, we also target many other interpersonal and soft skills
            that members pick up during their time in the club. These include
            but are not limited to problem-solving, leadership, teamwork,
            familiarity with Kaggle and data science platforms, and teaching and
            learning to instruct others. Members who enter committees get the
            chance to teach and share what they have learned with newer members,
            which helps them develop their ability to instruct and teach others.
            This can be a major contributor to their personality if they seek to
            pursue academia in the future or enhance their general ability to
            work within teams.
          </p>{" "}
        </Card>{" "}
        <Card className="flex flex-col p-4 space-y-2">
          <p className="font-light leading-relaxed">
            At the end of the year, members who are at the top of the score
            leaderboard are presented with job recommendations for various AI
            jobs. These recommendations come from the club chair and from
            previous club alumni who have graduated or are currently employed.
            This cycle allows the club to continually grow as we accumulate more
            alumni and, in turn, offer more recommendations, supporting the
            growth of more successful alumni and creating a positive feedback
            loop.
          </p>{" "}
        </Card>
      </>
    </div>
  );
};
