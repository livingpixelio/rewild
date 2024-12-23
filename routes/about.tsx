import { PageProps } from "$fresh/server.ts";
import { FunctionComponent } from "preact";
import { Wrapper } from "../components/Wrapper.tsx";
import { HalfCut } from "../islands/HalfCut.tsx";
import { Shrooms } from "../islands/Shrooms.tsx";

const About: FunctionComponent<PageProps> = ({ url }) => {
  return (
    <Wrapper url={url} pageTitle="About">
      <header>
        <HalfCut imgSlug="forest1" imgAlt="A lush forest">
          <blockquote>
            The troubles that have plagued “scientific” forestry, invented in
            the German lands in the late eighteenth century, and some forms of
            plantation agriculture typify the encounter. Wanting to maximize
            revenue from the sale of firewood and lumber from domain forests,
            the originators of scientific forestry reasoned that, depending on
            the soil, either the Norway spruce or the Scotch pine would provide
            the maximum cubic meters of timber per hectare. To this end, they
            clear-cut mixed forests and planted a single species simultaneously
            and in straight rows (as with row crops). They aimed at a forest
            that was easy to inspect, could be felled at a given time, and would
            produce a uniform log from a standardized tree (the Normalbaum). For
            a while—nearly an entire century—it worked brilliantly. Then it
            faltered. It turned out that the first rotation had apparently
            profited from the accumulated soil capital of the mixed forest it
            had replaced without replenishment. The single-species forest was
            above all a veritable feast for the pests, rusts, scales, and
            blights that specialized in attacking the Scotch pine or the Norway
            spruce. A forest of trees all the same age was also far more
            susceptible to catastrophic storm and wind damage. In an effort to
            simplify the forest as a one-commodity machine, scientific forestry
            had radically reduced its diversity. The lack of tree species
            diversity was replicated at every level in this stripped-down
            forest: in the poverty of insect species, of birds, of mammals, of
            lichen, of mosses, of fungi, of flora in general. The planners had
            created a green desert, and nature had struck back. In little more
            than a century, the successors of those who had made scientific
            forestry famous in turn made the terms “forest death” (Waldsterben)
            and “restoration forestry” equally famous (fig. 2.1).
          </blockquote>
          <p>
            {"\u2014"} James C. Scott,{" "}
            <em class="text-info">
              <a href="https://theanarchistlibrary.org/library/james-c-scott-two-cheers-for-anarchism">
                Two Cheers for Anarchism
              </a>
            </em>
          </p>
        </HalfCut>
      </header>
      <article class="py-10">
        <div class="container max-w-3xl mx-auto">
          <h1 class="text-3xl text-info font-bold my-4">About OptOut</h1>
          <p className="my-4">
            I think this as apt a metaphor for the problems currently plaguing
            our media landscape as any. Whenever a fundamentally chaotic system
            is managed by optimizing its behaviour according to a measurable
            benchmark, it quickly becomes apparent that there are other factors
            at play than the one accounted for. And they end up biting us.
          </p>
          <p class="text-center text-small italic text-info text-sm">
            <a href="https://sohl-dickstein.github.io/2022/11/06/strong-Goodhart.html">
              (Too much efficiency makes everything worse)
            </a>
          </p>
          <p class="my-4">
            Goodhart's Law is often stated as:{" "}
            <em class="text-primary">
              "When a measure becomes a target, it ceases to be a good measure"
            </em>. A simple example of this is that when students are evaluated
            according to exam performance, they become over-optimized at writing
            exams, to the detriment of learning what the course is attempting to
            teach them. But we see this same basic fallacy everywhere in
            twenty-first century, from academic publishing to supply-chaining.
          </p>

          <p class="text-center text-small italic text-info text-sm">
            <a href="https://www.noemamag.com/we-need-to-rewild-the-internet/">
              (We need to rewild the internet)
            </a>
          </p>
          <p class="my-4">
            Social media was planted on the fertile ground of the wild internet,
            and promised to connect us in ways that were awkward on the old web.
            And the platform social networks really did - and still do - provide
            an invaluable dimension to social connection across geographical and
            social distance. The problem is that their business models depend on
            mining one of our most valuable commodities: attention. And to
            optimize their efficiency in extracting attention they have
            constructed algorithms that maximize engagement, to the detriment of
            real human connection, deep thinking, and mindful behaviour.
          </p>

          <p class="my-4 text-lg px-4">
            We have seen the consequences of this reckless experiment in social
            engineering play out in many different areas of our society, but two
            stand out in particular:
            <a
              class="text-info font-bold px-1"
              href="https://www.newyorker.com/news/the-weekend-essay/is-the-media-prepared-for-an-extinction-level-event"
            >
              (1)
            </a>
            the degradation of the press, rampant conspiracy theories and the
            near-failure of democratic institutions, and
            <a
              class="text-info font-bold px-1"
              href="https://www.theatlantic.com/magazine/archive/2017/09/has-the-smartphone-destroyed-a-generation/534198/"
            >
              (2)
            </a>
            the deterioration of mental health, especially among the young. Like
            the tobacco companies of the last century,
            <a
              class="text-info font-bold px-1"
              href="https://www.wsj.com/articles/facebook-knows-instagram-is-toxic-for-teen-girls-company-documents-show-11631620739"
            >
              Silicon Valley knows they are selling a product that is making us
              sick,
            </a>
            and they continue to do so anyway.
          </p>

          <p class="my-4">
            By now, we all know this. We simply lump our problematic usage in
            with the other things we know we should do less of, like fast food,
            alcohol, and junk TV. Most of us can't go full Thoreau and move to
            the woods, so what's to be done?
          </p>
        </div>

        <Shrooms />

        <div class="container max-w-3xl mx-auto">
          <p class="mb-4">
            In 1966, Timothy Leary coined the following phrase, a kind
            advertising tagline to reject advertising:{" "}
            <em class="text-primary">"Turn on, tune in, drop out."</em>{" "}
            What he meant was:
          </p>

          <blockquote class="pl-4 border-l-4 border-success">
            "Turn on" meant go within to activate your neural and genetic
            equipment. Become sensitive to the many and various levels of
            consciousness and the specific triggers engaging them. "Tune in"
            meant interact harmoniously with the world around you—externalize,
            materialize, express your new internal perspectives. "Drop out"
            suggested an active, selective, graceful process of detachment from
            involuntary or unconscious commitments. "Drop Out" meant
            self-reliance, a discovery of one's singularity, a commitment to
            mobility, choice, and change.
          </blockquote>

          <p class="text-center text-small italic text-info text-sm">
            <a href="https://isbnsearch.org/isbn/9780525542872">
              (Digital Minimalism)
            </a>
          </p>

          <p class="my-4">
            In here, I think we find the explanation for why the usual remedies
            - digital detoxes and screen time limits - don't work. We can't
            change our behaviour without changing our intrinsic attitudes. If
            you need to be on LinkedIn to get (and keep) your job, then be on
            LinkedIn. But do so mindfully. Notice the ways it tries to grab and
            keep your attention. Notice how your mind responds when you read the
            latest outrage, and how small it becomes with just a little
            distance. Realize you are participating in an online game where you
            don't make - or even know - all the rules.
          </p>

          <p class="text-center text-small italic text-info text-sm">
            <a href="https://bradfrost.com/blog/post/write-on-your-own-website/">
              (Write on your own website)
            </a>
          </p>

          <p class="my-4">
            This website is an exploration of that evolving situation, a
            discussion of technologies that can help us in our current
            predicament, and a node in that original social network: the world
            wide web. It attempts to be the change I want to see in the world: a
            website which I own and which connects to the wider web on my terms.
            Rewilding begins with planting a single tree.
          </p>
        </div>
      </article>
    </Wrapper>
  );
};

export default About;
