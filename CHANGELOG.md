# Changelog

## [0.7.8](https://github.com/AlexandreGallais/synoptic-studio/compare/v0.7.7...v0.7.8) (2026-10-09)


### Documentation

* record the Product Owner's view on Q20 ([b7a6950](https://github.com/AlexandreGallais/synoptic-studio/commit/b7a695002fb8b2b2c83e29564fe36845758da385))

## [0.7.7](https://github.com/AlexandreGallais/synoptic-studio/compare/v0.7.6...v0.7.7) (2026-10-09)


### Documentation

* log the stop of the F02 run at VAL-002 ([6f0c25a](https://github.com/AlexandreGallais/synoptic-studio/commit/6f0c25afb18f72bf98c679d630a67a3f69343b22))

## [0.7.6](https://github.com/AlexandreGallais/synoptic-studio/compare/v0.7.5...v0.7.6) (2026-10-09)


### Build and dependencies

* **tooling:** check that GitHub Actions and Node.js are up-to-date ([2b9fbd9](https://github.com/AlexandreGallais/synoptic-studio/commit/2b9fbd96fda60a0a8db78746a64dce7eedb2ac19))

## [0.7.5](https://github.com/AlexandreGallais/synoptic-studio/compare/v0.7.4...v0.7.5) (2026-10-09)


### Build and dependencies

* **deps:** @types/node 26.6.5 ([13a87cd](https://github.com/AlexandreGallais/synoptic-studio/commit/13a87cd867003f50f70d27c07dd172d5ed30afa8))

## [0.7.4](https://github.com/AlexandreGallais/synoptic-studio/compare/v0.7.3...v0.7.4) (2026-10-09)


### Documentation

* **docs:** log the stop of the F02 run at Q19 ([4bb1095](https://github.com/AlexandreGallais/synoptic-studio/commit/4bb1095b825b5cd8be526feae42a34f2e67623bb))

## [0.7.3](https://github.com/AlexandreGallais/synoptic-studio/compare/v0.7.2...v0.7.3) (2026-10-09)


### Documentation

* **backlog:** set F02 in progress and its stories ready ([ade478a](https://github.com/AlexandreGallais/synoptic-studio/commit/ade478a585019ea3dc8817bb2b04f160df885d2a))

## [0.7.2](https://github.com/AlexandreGallais/synoptic-studio/compare/v0.7.1...v0.7.2) (2026-10-09)


### Documentation

* **backlog:** refine F02 with the Product Owner ([0f1345b](https://github.com/AlexandreGallais/synoptic-studio/commit/0f1345ba60f48edc8904dc410d434e6fb9cfaf6c))

## [0.7.1](https://github.com/AlexandreGallais/synoptic-studio/compare/v0.7.0...v0.7.1) (2026-10-09)


### Build and dependencies

* **deps:** eslint-plugin-jsdoc 65.2.2 ([9a7eb29](https://github.com/AlexandreGallais/synoptic-studio/commit/9a7eb29fa0252fe92cb8001f5a2f133838580543))

## [0.7.0](https://github.com/AlexandreGallais/synoptic-studio/compare/v0.6.9...v0.7.0) (2026-10-09)


### Features

* **geometry:** clamp corner radii locally and proportionally ([9e56066](https://github.com/AlexandreGallais/synoptic-studio/commit/9e56066063757f49da4dce532db8cc772fecd1fa))
* **geometry:** compute setbacks, edge lengths and edge factors ([13edb44](https://github.com/AlexandreGallais/synoptic-studio/commit/13edb4437a95a438a492a9d82635e2b1e100f273))
* **geometry:** compute the fillet arc of a corner ([f823c9f](https://github.com/AlexandreGallais/synoptic-studio/commit/f823c9f7db6cd4d5e18ac06297e6fc699f0baffd))
* **geometry:** define segments and arcs of an evaluated contour ([b5ed937](https://github.com/AlexandreGallais/synoptic-studio/commit/b5ed9371a6e647787ef057028ac5c9fffa50cb0d))
* **geometry:** evaluate a rounded contour into segments and arcs ([e6fa149](https://github.com/AlexandreGallais/synoptic-studio/commit/e6fa149a1d1517da9ea543b63129b2cb0888c2cc))
* **io:** write the arc command of a fillet ([f234a40](https://github.com/AlexandreGallais/synoptic-studio/commit/f234a40c63c7cec154b4457f6b6ab8f29f8e7ff6))
* **io:** write the path data of a rounded contour ([77fd981](https://github.com/AlexandreGallais/synoptic-studio/commit/77fd9816cb871b4f1df0671917c7ac930c9c33d1))
* **math:** add EPSILON and the length of a vector ([fe4898c](https://github.com/AlexandreGallais/synoptic-studio/commit/fe4898c48d55ff286189e2b618541f1939f2224b))
* **math:** add, scale, normalize and turn vectors ([f2280df](https://github.com/AlexandreGallais/synoptic-studio/commit/f2280df06c72be9814ebf61b0f43d3b4cbacbcc9))
* **model:** give the rectangle a global corner radius ([d45eb58](https://github.com/AlexandreGallais/synoptic-studio/commit/d45eb585e65088db41edf4d122047be6a5cf851f))
* **playground:** guide the Product Owner through the nine test steps ([14f98e3](https://github.com/AlexandreGallais/synoptic-studio/commit/14f98e3c18eff5c844e6c150e75e330db69f8822))
* **playground:** round the rectangle corners with a radius input ([6b99a64](https://github.com/AlexandreGallais/synoptic-studio/commit/6b99a647e5e064bffd8b46b8e91fefab02245ad4))


### Bug fixes

* **geometry:** return no turn on a zero-length edge whatever the zeros ([cd51d9f](https://github.com/AlexandreGallais/synoptic-studio/commit/cd51d9f2516382ceef3028b3d92162494747e75c))
* **playground:** clear the effective radius of a refused input ([a1ada4a](https://github.com/AlexandreGallais/synoptic-studio/commit/a1ada4a571b84f536b2fbb2ac6076f3358fa479c))


### Refactoring

* **geometry:** generalize cyclicVertex into cyclicItem ([7b6624f](https://github.com/AlexandreGallais/synoptic-studio/commit/7b6624f9dc90d847678bc6019508c13fbf3116a2))


### Documentation

* align the domain and the feature plan with what F01 built ([5510896](https://github.com/AlexandreGallais/synoptic-studio/commit/5510896f29f4332017f9679b605e022cd8255462))
* apply the auditor findings on CHK-001 ([34b9711](https://github.com/AlexandreGallais/synoptic-studio/commit/34b9711cf810494c4b06e24e98ab84c138d20430))
* **backlog:** apply the auditor findings on SP-001 ([a4001f7](https://github.com/AlexandreGallais/synoptic-studio/commit/a4001f75e5c690ec09efbfb325cc9a236d7f7d3b))
* **backlog:** inventory the needs of the remaining F01 stories ([4df4013](https://github.com/AlexandreGallais/synoptic-studio/commit/4df40136582d81962e08d6508a2e3b09e09a6068))
* **backlog:** record the findings of the F01 audit ([8d8851d](https://github.com/AlexandreGallais/synoptic-studio/commit/8d8851d6e80613b7b0da94a4c68ee8837ff2a4af))
* **backlog:** record the light evolvability check of F01 ([6f6cca9](https://github.com/AlexandreGallais/synoptic-studio/commit/6f6cca9a605ee3a736c0a8fc609165e3783439d9))
* **backlog:** record the Product Owner validation of F01 ([3c986a5](https://github.com/AlexandreGallais/synoptic-studio/commit/3c986a59f8a6d9d2085d4d3ec8c8821e6f7d743b))
* **backlog:** set AUD-001 done ([878f685](https://github.com/AlexandreGallais/synoptic-studio/commit/878f68527542c779114c7c29fadd6873e2fb0d29))
* **backlog:** set AUD-001 ready ([a2d0dde](https://github.com/AlexandreGallais/synoptic-studio/commit/a2d0dde22bdb16cb13966498bf43f60f4fbf9cbb))
* **backlog:** set CHK-001 done ([5148393](https://github.com/AlexandreGallais/synoptic-studio/commit/5148393d451c4f5938e0eb15c3e44198b655d6ed))
* **backlog:** set CHK-001 ready ([71dae66](https://github.com/AlexandreGallais/synoptic-studio/commit/71dae66491a44e1130b60f63168586d4f4879caf))
* **backlog:** set EN-005 done ([ddfddc8](https://github.com/AlexandreGallais/synoptic-studio/commit/ddfddc8d4d2da73775c6a2bd1e657bde5d916a05))
* **backlog:** set EN-005 ready ([9a8ace5](https://github.com/AlexandreGallais/synoptic-studio/commit/9a8ace5340c8d491007926febb7535f005adc5bc))
* **backlog:** set EN-006 done ([07e1e76](https://github.com/AlexandreGallais/synoptic-studio/commit/07e1e76b7096e8c037e145c51877a723784e5854))
* **backlog:** set EN-006 ready ([cc03e3e](https://github.com/AlexandreGallais/synoptic-studio/commit/cc03e3ed0b2e501a06ff8959d5c3088222f7cdd1))
* **backlog:** set EN-007 done ([39ee67a](https://github.com/AlexandreGallais/synoptic-studio/commit/39ee67ad86cec3ed9750821508381d86629fbb2d))
* **backlog:** set EN-007 ready ([2a9761a](https://github.com/AlexandreGallais/synoptic-studio/commit/2a9761ad32f98cb0719081f1a9bed29a57f4a055))
* **backlog:** set SP-001 done ([cd8bc98](https://github.com/AlexandreGallais/synoptic-studio/commit/cd8bc9861ae2752bc767d396f444d44ceff58f45))
* **backlog:** set SP-001 ready ([d7ba79c](https://github.com/AlexandreGallais/synoptic-studio/commit/d7ba79cb5435090d637c7b3a05659fd75ed76bdd))
* **backlog:** set US-003 done ([2bb9f6f](https://github.com/AlexandreGallais/synoptic-studio/commit/2bb9f6f1893376c69f6db5486fa22471ea4254d6))
* **backlog:** set US-003 ready ([4083f5e](https://github.com/AlexandreGallais/synoptic-studio/commit/4083f5e62c718cf34a1e1121270fffe93f758f47))
* **backlog:** set VAL-001 and F01 done ([f8b03fc](https://github.com/AlexandreGallais/synoptic-studio/commit/f8b03fcc9808672805f820f4dc558383d70afd55))
* **backlog:** set VAL-001 ready ([eebc586](https://github.com/AlexandreGallais/synoptic-studio/commit/eebc586413b1e836cdda474d5dd27b6669b31f5a))
* **backlog:** source the remaining F01 stories ([d610ae2](https://github.com/AlexandreGallais/synoptic-studio/commit/d610ae218829cbbc31f7111d273ad284f2bd5b53))
* **backlog:** write the Product Owner test card of US-003 ([156a916](https://github.com/AlexandreGallais/synoptic-studio/commit/156a91632ae4b09bb6ccac111159b77e673e5e80))
* bring rules, glossary and lessons up to date mid-F01 ([6f49f5e](https://github.com/AlexandreGallais/synoptic-studio/commit/6f49f5e631f97b3106a96a3e26eee6f8ee417c92))
* explain F01 in plain language in the guide ([1501750](https://github.com/AlexandreGallais/synoptic-studio/commit/15017503caec949624cf8fb4a61cfe07c89437df))
* **geometry:** cite the sources of every derivation step ([2699c80](https://github.com/AlexandreGallais/synoptic-studio/commit/2699c809a8863b5008bc79aab919d69f881ff33e))
* **geometry:** derive the tangent points, center and flags of a fillet ([40170f2](https://github.com/AlexandreGallais/synoptic-studio/commit/40170f2ecc9697afe6bae7212dce72e68f6c60ed))
* **geometry:** qualify the closepath equality for zero-length edges ([7b34bdc](https://github.com/AlexandreGallais/synoptic-studio/commit/7b34bdc1f53ddad7faf6c138739e97fc7f295965))
* **geometry:** state the limits of rounded contours found by the audit ([c84d28d](https://github.com/AlexandreGallais/synoptic-studio/commit/c84d28de1872388fa0dda9546213b27bb7753cdd))
* settle Q16, a spike is consumed by its fillet ([fbcc7b3](https://github.com/AlexandreGallais/synoptic-studio/commit/fbcc7b351d759907f8a36786a64835b91e57d7d6))
* settle Q17, keep the radius where nothing is rounded ([578f092](https://github.com/AlexandreGallais/synoptic-studio/commit/578f092aee494c0ae166871d1ccf424025929c06))

## [0.6.9](https://github.com/AlexandreGallais/synoptic-studio/compare/v0.6.8...v0.6.9) (2026-10-09)


### Documentation

* record the stop of the F01 autonomous run ([cb4c0ce](https://github.com/AlexandreGallais/synoptic-studio/commit/cb4c0ce6f8ba547724da211919bcc0d5e17a9353))


### Build and dependencies

* **deps:** update happy-dom to 20.14.6 ([3d03db1](https://github.com/AlexandreGallais/synoptic-studio/commit/3d03db12242534d035b6cf106d0592a77b5c8ead))

## [0.6.8](https://github.com/AlexandreGallais/synoptic-studio/compare/v0.6.7...v0.6.8) (2026-10-08)


### Documentation

* record the start of the autonomous run of F01 ([de28b1f](https://github.com/AlexandreGallais/synoptic-studio/commit/de28b1f3e967d90c9b46481c9f45f60936337ea0))

## [0.6.7](https://github.com/AlexandreGallais/synoptic-studio/compare/v0.6.6...v0.6.7) (2026-10-08)


### Documentation

* **adr:** add feature branches and autonomous runs ([773b4f9](https://github.com/AlexandreGallais/synoptic-studio/commit/773b4f9a17db21768614be42baca853c43a46769))

## [0.6.6](https://github.com/AlexandreGallais/synoptic-studio/compare/v0.6.5...v0.6.6) (2026-10-08)


### Documentation

* **adr:** trace acceptance criteria to tests and releases ([55f0054](https://github.com/AlexandreGallais/synoptic-studio/commit/55f0054711065fae3eaf0d54264b87b913fe0344))

## [0.6.5](https://github.com/AlexandreGallais/synoptic-studio/compare/v0.6.4...v0.6.5) (2026-10-08)


### Documentation

* **adr:** keep the core portable to any engine and language ([f55a735](https://github.com/AlexandreGallais/synoptic-studio/commit/f55a735b751ff6ca14a9acd6d7bff2ba4d261822))
* remove personal details from the documentation ([fcb51c1](https://github.com/AlexandreGallais/synoptic-studio/commit/fcb51c1a8b870926629132a583b7826ad5d8a896))

## [0.6.4](https://github.com/AlexandreGallais/synoptic-studio/compare/v0.6.3...v0.6.4) (2026-10-08)


### Documentation

* add contributing guide, code of conduct and issue forms ([ca40791](https://github.com/AlexandreGallais/synoptic-studio/commit/ca407913161aa7b10bce2785809cdb1b939a89a4))
* **adr:** keep a session journal instead of a database ([ecc285d](https://github.com/AlexandreGallais/synoptic-studio/commit/ecc285dec76f8a9165a5543e3c5db73c837e91d3))
* **backlog:** set F01 and E01 in progress ([de7b5ab](https://github.com/AlexandreGallais/synoptic-studio/commit/de7b5abd993b10e056783eb1f66a6262af3dcadd))
* extend the writing rules ([e4b1f07](https://github.com/AlexandreGallais/synoptic-studio/commit/e4b1f0720dc3d8d6bdf5f3975c887e88ad92b788))
* write the feedback of the Product Owner on their behalf ([d5819fa](https://github.com/AlexandreGallais/synoptic-studio/commit/d5819fa349659039af9516c68e2fdbe264be0b05))

## [0.6.3](https://github.com/AlexandreGallais/synoptic-studio/compare/v0.6.2...v0.6.3) (2026-10-08)


### Documentation

* add the process, guide and playbook sections ([41d41c0](https://github.com/AlexandreGallais/synoptic-studio/commit/41d41c08e935d376b12cb440c8031633f55205a7))
* **adr:** inspect each feature with a demo and each epic with a review ([a0c3803](https://github.com/AlexandreGallais/synoptic-studio/commit/a0c380319a1057baaa445936ce2f9211105e3181))


### Build and dependencies

* **deps:** update eslint-plugin-jsdoc to 65.2.1 ([e548ef6](https://github.com/AlexandreGallais/synoptic-studio/commit/e548ef64b29fd9d6ce016ee5670770a5ef46db97))

## [0.6.2](https://github.com/AlexandreGallais/synoptic-studio/compare/v0.6.1...v0.6.2) (2026-10-08)


### Documentation

* **adr:** adopt an agent working environment and property-based tests ([e80daaa](https://github.com/AlexandreGallais/synoptic-studio/commit/e80daaa99c2ba5da8ba9b93bca4dd7ac1b8b154b))
* **backlog:** interview the Product Owner and use the auditor in audits ([86c4c6d](https://github.com/AlexandreGallais/synoptic-studio/commit/86c4c6d8899bc6bd96d1867e5be0539937834eca))
* record agent and verification practices ([ea1dea3](https://github.com/AlexandreGallais/synoptic-studio/commit/ea1dea37da0c5c9474fc526a43316969d6565247))


### Build and dependencies

* **deps:** add fast-check for property-based tests ([6676286](https://github.com/AlexandreGallais/synoptic-studio/commit/6676286d15104f0d907d55545ae1e1fac68fc28b))

## [0.6.1](https://github.com/AlexandreGallais/synoptic-studio/compare/v0.6.0...v0.6.1) (2026-10-08)


### Documentation

* **adr:** open every feature with research and close it with an audit ([02fe633](https://github.com/AlexandreGallais/synoptic-studio/commit/02fe633b419a4e095e445227e56a743e01452452))
* **backlog:** frame features with research, audit and validation ([d878721](https://github.com/AlexandreGallais/synoptic-studio/commit/d878721cc018e4daabb8be4bb097946a7848c831))
* reorganize CLAUDE.md and fix stale statements ([bc40731](https://github.com/AlexandreGallais/synoptic-studio/commit/bc4073136558db9d6aed38db012f229dc04961fc))

## [0.6.0](https://github.com/AlexandreGallais/synoptic-studio/compare/v0.5.0...v0.6.0) (2026-10-08)


### Features

* **geometry:** compute the fillet setback at a corner ([c7d7021](https://github.com/AlexandreGallais/synoptic-studio/commit/c7d7021e6f602b18a5cf72a9ab3b0427e1d49fa0))


### Documentation

* **backlog:** set EN-004 done ([30dc64a](https://github.com/AlexandreGallais/synoptic-studio/commit/30dc64a782427d676ceb2bec38ad9d10ba3f6cc6))
* **backlog:** set EN-004 ready ([7cc33ef](https://github.com/AlexandreGallais/synoptic-studio/commit/7cc33efd8ba92a2fab3daf5bcb3e5f9d1e653429))
* **geometry:** derive the fillet setback from Euclid ([583c11e](https://github.com/AlexandreGallais/synoptic-studio/commit/583c11e03bd367a40cf7c81ad034d090e841a11e))

## [0.5.0](https://github.com/AlexandreGallais/synoptic-studio/compare/v0.4.0...v0.5.0) (2026-10-08)


### Features

* **geometry:** compute the turning angle at each contour vertex ([2a75345](https://github.com/AlexandreGallais/synoptic-studio/commit/2a753455ec4a83018da28f13b41d74c31c73455f))
* **math:** add vector subtraction, dot and perp dot products ([00c3613](https://github.com/AlexandreGallais/synoptic-studio/commit/00c36137031c2035330141cdfff736d579d7af66))


### Documentation

* **backlog:** set EN-003 done ([c20d143](https://github.com/AlexandreGallais/synoptic-studio/commit/c20d143972c36c2a7841e832acc609cc51e48039))
* **backlog:** set EN-003 ready ([9b7296a](https://github.com/AlexandreGallais/synoptic-studio/commit/9b7296a1b8e98b8c0d963d32f15699aaa8c019f7))
* **geometry:** derive the turning angle at a contour vertex ([2958131](https://github.com/AlexandreGallais/synoptic-studio/commit/295813143ed5d39a9f753c80ae470ae768eb86d6))

## [0.4.0](https://github.com/AlexandreGallais/synoptic-studio/compare/v0.3.0...v0.4.0) (2026-10-08)


### Features

* **playground:** draw a sharp rectangle from typed width and height ([9b28900](https://github.com/AlexandreGallais/synoptic-studio/commit/9b28900f4e346909e82ef234b5df4a1c6e0a893e))
* **playground:** draw shapes at a fixed scale ([410301b](https://github.com/AlexandreGallais/synoptic-studio/commit/410301bd7b868b477aee40bad9dbbbe6e42adea8))
* **playground:** keep the scale when the window is resized ([8ef3079](https://github.com/AlexandreGallais/synoptic-studio/commit/8ef3079b8aaee0894268ec5179f01c9ae5a72ed5))
* **render:** create SVG canvas and path elements ([9568ebc](https://github.com/AlexandreGallais/synoptic-studio/commit/9568ebc1474151b097df86aaa74034d641219e0e))


### Documentation

* **backlog:** add US-004, fixed scale in the playground ([2a898ec](https://github.com/AlexandreGallais/synoptic-studio/commit/2a898eccad779c079bf9a1dc6babfb9e739f87d1))
* **backlog:** set US-002 done ([a8f08c7](https://github.com/AlexandreGallais/synoptic-studio/commit/a8f08c7c6c783263bb9db8141424111837066795))
* **backlog:** set US-002 ready ([39467e3](https://github.com/AlexandreGallais/synoptic-studio/commit/39467e30a5785c8bc42686cacdf6442c8a64fb03))
* **backlog:** set US-004 done ([0c8e601](https://github.com/AlexandreGallais/synoptic-studio/commit/0c8e60192b02b3b4988372cebb96df808e10e114))

## [0.3.0](https://github.com/AlexandreGallais/synoptic-studio/compare/v0.2.2...v0.3.0) (2026-10-08)


### Features

* **io:** write the path data of a sharp contour ([349f58e](https://github.com/AlexandreGallais/synoptic-studio/commit/349f58ee29753e487ac39fc2125eeac6a659f62d))


### Documentation

* **backlog:** set EN-002 done ([8c3221f](https://github.com/AlexandreGallais/synoptic-studio/commit/8c3221f48325adffca013702336909da3c966746))
* **backlog:** set EN-002 ready ([78a73d7](https://github.com/AlexandreGallais/synoptic-studio/commit/78a73d72ed8dd03eb1cafff96b547f3daae45e0a))

## [0.2.2](https://github.com/AlexandreGallais/synoptic-studio/compare/v0.2.1...v0.2.2) (2026-10-08)


### Documentation

* **backlog:** set stories done in their pull request ([f567ab2](https://github.com/AlexandreGallais/synoptic-studio/commit/f567ab29130e4db3f259ab130cc69d9c8887d265))

## [0.2.1](https://github.com/AlexandreGallais/synoptic-studio/compare/v0.2.0...v0.2.1) (2026-10-08)


### Documentation

* **backlog:** set US-001 done ([105e476](https://github.com/AlexandreGallais/synoptic-studio/commit/105e4768e75c65909b3c67a6f493369211d7a27f))

## [0.2.0](https://github.com/AlexandreGallais/synoptic-studio/compare/v0.1.1...v0.2.0) (2026-10-08)


### Features

* **math:** add the Point type ([606fcaf](https://github.com/AlexandreGallais/synoptic-studio/commit/606fcafac810839c435d6676f342784c68c4c411))
* **model:** add the rectangle contour and its validation ([14c324b](https://github.com/AlexandreGallais/synoptic-studio/commit/14c324bc5611cb2fd32077158e11ca67186671f8))


### Bug fixes

* **model:** document type members and catch it before the docs build ([280c024](https://github.com/AlexandreGallais/synoptic-studio/commit/280c02489b3a97e1241b9c2cff03232a5f9cb2e0))


### Documentation

* **backlog:** set US-001 ready ([4312d02](https://github.com/AlexandreGallais/synoptic-studio/commit/4312d02f096ff9151f79b05a36e082e47880af50))
* **backlog:** tick US-001 tasks and record the empty-barrel pitfall ([c4a3ae9](https://github.com/AlexandreGallais/synoptic-studio/commit/c4a3ae955352c2c87a514ee6ad3cc13f18288f4f))

## [0.1.1](https://github.com/AlexandreGallais/synoptic-studio/compare/v0.1.0...v0.1.1) (2026-10-08)


### Documentation

* **tooling:** list the tools considered for later ([2f3851c](https://github.com/AlexandreGallais/synoptic-studio/commit/2f3851c412088a9cc176bff85039d9be2463870c))


### Build and dependencies

* **tooling:** require full coverage and add standard repository files ([0a35732](https://github.com/AlexandreGallais/synoptic-studio/commit/0a35732274683c207bed0c9a8be8ae97bc8ae7e3))

## 0.1.0 (2026-10-08)


### Features

* **io:** add formatSvgNumber for fixed-precision output ([a80a4b9](https://github.com/AlexandreGallais/SVG-Editor/commit/a80a4b91379a6ce45f3f5d0aa33740e8f6e9ef65))
* **io:** add SVG_DECIMALS output precision ([d589865](https://github.com/AlexandreGallais/SVG-Editor/commit/d589865ecf64508e2fbd2f7e1a1bfbf7dd5009a9))


### Documentation

* **adr:** allow Bézier curves in static drawings and settle Q12 to Q15 ([f1c2d8c](https://github.com/AlexandreGallais/SVG-Editor/commit/f1c2d8c68e3fde3825833b8df6a93af2eed59241))
* **backlog:** record EN-001 output rules and tick its tasks ([4cffcc8](https://github.com/AlexandreGallais/SVG-Editor/commit/4cffcc8c15d96f825b32ce46e6e7dde6c4f78ab8))
* **backlog:** rewrite epics from the product vision and plan F01 ([af2314d](https://github.com/AlexandreGallais/SVG-Editor/commit/af2314dd60b9f735b673adbce2fdbeba94a88514))
* **backlog:** set EN-001 done ([8adcd74](https://github.com/AlexandreGallais/SVG-Editor/commit/8adcd7448f84301844478b7597b4445243b75a7d))
* **backlog:** set EN-001 ready ([c5368c0](https://github.com/AlexandreGallais/SVG-Editor/commit/c5368c065bd4cabf3993960590d6b7abea7b0cad))


### Build and dependencies

* **deps:** bump vite from 8.3.3 to 8.3.4 ([d3165cb](https://github.com/AlexandreGallais/SVG-Editor/commit/d3165cb568105b1d1201791f79b34f2f23a46eeb))
* **eslint:** lint Markdown structure with @eslint/markdown ([1a8ca61](https://github.com/AlexandreGallais/SVG-Editor/commit/1a8ca61e97bcf35ed0b97ccb2ecd2fd5bdd1ea67))
* **eslint:** require kebab-case file names named after the export ([c6354b9](https://github.com/AlexandreGallais/SVG-Editor/commit/c6354b9a0863858cac49ecc491c41f9e68a8850a))
