import { WfHead } from "wordfresh";
import { PageProps } from "$fresh/server.ts";
import Hero from "../islands/Hero.tsx";

export default function Home({ url }: PageProps) {
  return (
    <>
      <WfHead url={url} />
      <Hero>
        <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
          <h1 class="text-4xl font-bold text-success">
            OptOut
          </h1>
          <p class="my-4">
            An experiment in rewilding the internet.
          </p>
        </div>
      </Hero>
      <div class="container max-w-3xl mx-auto">
        <p>
          I'm baby taiyaki meh yuccie bicycle rights yes plz beard man bun big
          mood brunch chicharrones artisan tattooed pabst. Tousled cold-pressed
          raw denim air plant vice. Sus gochujang Brooklyn cupping, brunch
          polaroid tbh. Hella distillery yes plz, meh man bun gastropub
          knausgaard kitsch typewriter you probably haven't heard of them swag
          chillwave try-hard glossier raclette.
        </p>
        <p>
          Fixie tilde trust fund butcher. Etsy single-origin coffee kinfolk,
          selfies tumblr drinking vinegar tonx hammock. Schlitz mukbang pork
          belly aesthetic mumblecore art party. Selvage leggings aesthetic,
          solarpunk kickstarter mixtape grailed.
        </p>
        <p>
          Street art big mood try-hard Brooklyn hashtag pok pok lo-fi fam vegan
          butcher. Echo park chartreuse mukbang kogi thundercats pinterest
          neutra blackbird spyplane seitan enamel pin franzen lyft photo booth
          polaroid. DIY unicorn venmo four loko grailed brunch. Enamel pin fixie
          art party flexitarian, master cleanse mixtape mustache vaporware
          biodiesel organic ascot. 8-bit synth four dollar toast poutine
          literally letterpress everyday carry fingerstache authentic stumptown
          sus yuccie photo booth art party.
        </p>
        <p>
          Pug vape celiac 3 wolf moon kale chips, bruh YOLO craft beer tonx tbh
          irony. Occupy flexitarian bespoke twee williamsburg drinking vinegar
          mlkshk marxism. Lyft hammock tbh shabby chic helvetica bodega boys
          wayfarers fanny pack blog pug vice biodiesel. Gastropub pop-up
          humblebrag pork belly hexagon live-edge tumblr yuccie 3 wolf moon
          vinyl banh mi occupy taxidermy. Wayfarers kitsch tattooed, 3 wolf moon
          sartorial pabst blue bottle tumblr adaptogen man braid. Keffiyeh
          godard solarpunk helvetica praxis bruh whatever paleo meditation
          chillwave kombucha. Succulents pork belly slow-carb, copper mug direct
          trade mukbang gochujang marfa ascot prism sustainable waistcoat
          tumeric.
        </p>
        <p>
          Chia copper mug marxism mukbang. Vape jianbing bodega boys paleo
          raclette. Seitan kinfolk paleo, hella single-origin coffee flexitarian
          yr gastropub vegan knausgaard. Raw denim woke knausgaard scenester.
          Lyft lumbersexual fingerstache narwhal, skateboard godard seitan
          shaman gluten-free cold-pressed copper mug blackbird spyplane
          farm-to-table actually. Locavore chia next level umami.
        </p>
        <p>
          Gatekeep narwhal neutra copper mug yes plz, fam sartorial fanny pack
          cliche echo park jianbing. VHS hella migas man bun forage. Pour-over
          you probably haven't heard of them ascot succulents normcore gochujang
          try-hard letterpress banh mi pug glossier artisan post-ironic
          chicharrones. Af polaroid artisan pok pok flexitarian pitchfork ugh
          lo-fi raclette gluten-free literally shaman kale chips. You probably
          haven't heard of them tacos bitters cronut bushwick venmo.
        </p>
        <p>
          Narwhal affogato raclette, green juice meggings prism selvage Brooklyn
          coloring book butcher four dollar toast synth enamel pin health goth.
          Fingerstache mixtape hell of 8-bit la croix locavore VHS beard
          portland. Gochujang snackwave swag, chicharrones dreamcatcher freegan
          selvage tacos unicorn microdosing ramps. Activated charcoal shaman meh
          hot chicken neutral milk hotel green juice pabst occupy scenester
          praxis adaptogen. Beard small batch enamel pin cloud bread chambray
          kitsch DSA sus truffaut jawn flannel chicharrones retro lyft. Mukbang
          praxis try-hard tacos, chillwave kitsch VHS. Organic kickstarter 90's
          bitters twee beard.
        </p>
        <p>
          Sus offal sartorial meh, raw denim bicycle rights flannel kickstarter
          gorpcore vibecession. Vape hoodie VHS fashion axe roof party.
          Skateboard fit blackbird spyplane fam tumblr direct trade. Authentic
          tilde lo-fi austin, chillwave mukbang master cleanse intelligentsia.
        </p>
        <p>
          Unicorn taiyaki af mustache tumblr keytar aesthetic selfies hell of
          pug pok pok poke. Actually literally whatever farm-to-table distillery
          gatekeep banjo ennui thundercats artisan waistcoat keytar stumptown.
          Meditation cornhole wayfarers street art, cloud bread 8-bit tonx jean
          shorts migas locavore copper mug blackbird spyplane selvage.
          Typewriter cred selvage messenger bag ennui kinfolk vinyl DSA
          kickstarter bitters. Food truck dreamcatcher palo santo man bun wolf
          crucifix neutra. Bruh slow-carb semiotics solarpunk, tacos iPhone
          before they sold out chillwave pickled pug. Wayfarers migas banjo
          cloud bread, tumblr kinfolk air plant poke hoodie thundercats flannel
          farm-to-table.
        </p>
        <p>
          Post-ironic try-hard marfa ascot poutine. Keytar poke shoreditch 8-bit
          craft beer chicharrones mlkshk. Photo booth scenester selvage, raw
          denim austin freegan cold-pressed gluten-free skateboard four dollar
          toast flexitarian taiyaki. Beard lumbersexual banjo, kickstarter
          locavore butcher tattooed chicharrones heirloom vexillologist air
          plant cred distillery. Tilde iPhone hexagon, meggings blog flannel
          sriracha listicle gochujang narwhal gorpcore.
        </p>
      </div>
    </>
  );
}
