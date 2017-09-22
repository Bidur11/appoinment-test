#!D:\Perl\bin\perl.exe

 	use CGI; 
 	use strict;
  	use warnings;
  	use DBI;
  	use JSON;
	
	print "Content-type: text/plain\n\n";
	use CGI::Carp qw(warningsToBrowser fatalsToBrowser); 
	my $cgi = CGI->new;
	
	my $search = $cgi->param("search_query");
	
   


   # Connecting to the database.
   my $dbconn = DBI->connect("DBI:mysql:database=appoinment_app;host=127.0.0.1",
                         "root", "root",
                         {'RaiseError' => 1});

 
   # Retrieving data from the table.
   my $sth = $dbconn->prepare("SELECT * FROM Appoint WHERE description LIKE '%$search%';");
   $sth->execute();
  
 
   my @output;
  
   while (my $ref = $sth->fetchrow_hashref()) {
    push @output, $ref;
   }
  
   print objToJson( { @output } );
  
   $sth->finish();


  
  # Disconnecting from the database.
  $dbconn->disconnect();