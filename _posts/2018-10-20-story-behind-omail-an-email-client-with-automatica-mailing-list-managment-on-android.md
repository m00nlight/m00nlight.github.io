---
layout: post
title: "Story behind OMail: An email client with automatic mailing list management on Android"
description: ""
category: Android
tags: [Android, app, email]
excerpt: This post describe the story behind why I build the OMail App on Android.
         And the feeling and thing I learn during the procedure. It is not about
         technique details, but the general thing about this application.
---
{% include JB/setup %}

I still remember the old days when [Opera browser][8] is a kind of Emacs in
browser world. You have a mail client integrated which you can manage your
emails, there is a IRC client which you can chat over different chat rooms.
Also the Emacs fans can use emacs shortcuts in Opera, which is great if you
are a user of Emacs editor, since most of your favorite shortcut works out
of box, and you can use it either in browser, email editing or IRC chat, and
you don't need to install any extra plugin for that.


{% include i.html i="assets/images/operaMac3.png" c="Opera Browser add multiple type of accounts"%}


Time flies, Opera change to follow the Chrome browser kernel after version 12.
It also make the email client a standalone program, but sadly they also
[stop the support of this great software][1]. I would not argue whether it is
correct or wise decision for [Opera][8] to follow this path, since in my
opinion, popularity is neither good or bad, it is just popularity. As a pioneer
in browser software industry, [Opera][8] left us a lot of innovations like tab
view, speed dial, mouse gesture etc. And unlike other company, which use patents
to make law suit against others, [Opera][8] only use patent as a protection for
themselves, but do not [abuse patents to stop innovation][9]. [Opera][8] may
fail one day, but all these are the valuable assets [Opera][8] left for the
world.

Although [Opera Mail][1] has this and that problems for opera mails, but I still
like this software so much that I wish they could continue to improve it. 
So for example, the following is an example a lot of mailing lists with only 
a random number as prefix but are actually the same one.

{% include i.html i="assets/images/mailinglist_with_random_number2.png" c="Mailing list with random number"%}

Although this is quite a easy problem to fix, I also report this to them but got
no reply. And it seems that the software is indeed dead in his life cycle. Sigh :(.

As a long time [Blackberry](10) fan, I also tried the the mail client on the 
Blackberry OS 10 system, I would say it is quite a excellent platform and email
client, everytime when message get into my inbox, it is pushed to my blackberry
client almost instantly. I think it is really good for people who wish to 
stay online forever, and would like to get notification as soon as possible,
but it is just not my flavor. And [Blackberry](10) is smirking at the 
[iPhone X's](11) "there's never been a better way" to interact with your phone.
At least it is there back to 2013 when [Blackberry](10) release the [Q10][12]
device. Not to mention all later innovations like keyboard as trackpad, swipe
to select and delete text in other [Blackberry](10) devices. As [Opera][8],
[Blackberry](10) also almost fails in the mobile world, but it also does not 
mean either their product or software are bad or not, maybe just a lack of 
lucky.

{% include i.html i="assets/images/Blackberry-swipe-gesture.png" c="Blackberry Q10 gestures." url="https://help.blackberry.com/en/blackberry-q10/current/help/mes1335535802053.html" %}



But here is the good part to be as a programmer, if you really want something,
but there is nothing meet your needs, you can try to build it yourself. That's
why during the last several months, I try to learn and build an email client on
[Android][2] which do have the similar features as [Opera Mail][1].

It is my first [Android][2] application, and I have mixed feelings during the
adventure. I have never develop any app previously. At beginning, I want to use
some cross platform approach like [Xamarin][3] to do this project, since it
seems to be promising to just write one software but can run on multiple
platforms. But I found that the [Xamarin][3] is extremely buggy and most of my
time are spending on searching the strange error message just because I update
the framework. And even the sample projects offered with [Visual Studio][4] does
not work. In the end, the [Xamarin][3] is like an [white elephant][5] to me for
developing application. It may have some showcases to build some toy like
project which can run in multiple platforms, but if you want to build any real
project, it will give you a lot of troubles.

Then I just decided to stick to the [Android][2] platform. Although it also has
problem and bugs behind, but the experience is much much moer smooth than [Xamarin][3].
So I started learning the basic block of building android application. Start to do 
the project bit by bit, solve any problem during this procedure.

After months of work in my spare time, I am proud to announce the initial
release of [OMail][6] and [OMail Pro][7]. It is an email client on [Android][2]
which have the some of the most important feature as [Opera Mail][1], like

- Automatically mailing list management
- Account View
- Attachment View
- Customized control of what to sync for your email on your phone
- etc.

It does not have the feature like customized tagging in [Opera Mail][1], 
because the custom tags can only store locally, but I would like everything can be
synchronized between all email clients. So I implement star as the only tagging
method for message since it is supported by most of the mail providers.

It also do not do full sync like what [Opera Mail][1] do in the desktop, but
does incremental sync, which may let some old emails in different state(like y
ou move a very old message to another folder). But it offer the user customized
sync which can let the user to sync message during an time range.

The [OMail][6] & [OMail Pro][7] also will prefer to save plain text email
instead of save all mail information like what [Opera Mail][1] did. That is
because I want to limit the use of storage on a mobile device and also plain
text are enough for most programmer is the group who use mailing list the most,
and they normally prefer to discuss in an plain text format(Take how popular
markdown is nowadays into consideration). And also most html mail are promotion
related.

If you're programmer or any professional work with large amount of mailing
lists, and you're tired of add more and more filters in your email account
every time you find you miss some filter, you're welcome to give [OMail][6]
or [OMail Pro][7] a try, and also you're welcome to give feedback for any
problem or future improvements of these application.

<div align="center">
  <a href="https://www.youtube.com/watch?v=zWoh1Dqq6-Y">
  <img src="https://img.youtube.com/vi/zWoh1Dqq6-Y/0.jpg" alt="IMAGE ALT TEXT">
  </a>
  <h5>Initial release video. Click to view</h5>
</div>

[1]: https://en.wikipedia.org/wiki/Opera_Mail
[2]: https://www.android.com/
[3]: https://en.wikipedia.org/wiki/Xamarin
[4]: https://visualstudio.microsoft.com/
[5]: https://en.wikipedia.org/wiki/White_elephant
[6]: https://play.google.com/store/apps/details?id=com.m00nlight.omail
[7]: https://play.google.com/store/apps/details?id=com.m00nlight.omail_pro
[8]: https://www.opera.com/
[9]: http://en.swpat.org/wiki/Opera_Software
[10]: https://www.blackberry.com/en
[11]: https://en.wikipedia.org/wiki/IPhone_X
[12]: https://en.wikipedia.org/wiki/BlackBerry_Q10

